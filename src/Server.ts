import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

dotenv.config();

import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.SERVER_PORT || 5174;

// Initialize Supabase Admin Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

app.use(cors());
app.use(express.json());

// In-memory store for verification codes (email -> { code, expiresAt })
// In production, use Redis or a database.
const verificationCodes = new Map<
  string,
  { code: string; expiresAt: number }
>();

app.post("/api/send-code", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Generate 4-digit code
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Store code
  verificationCodes.set(email, { code, expiresAt });

  console.log(`Code for ${email}: ${code}`); // Log for debugging

  try {
    // Using native fetch to debug SDK issue "Unable to fetch data"
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Eat Easy <auth@sir-p.tech>",
        to: [email],
        subject: "Your Verification Code",
        html: `<p>Your verification code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API Error:", response.status, errorText);
      return res
        .status(500)
        .json({ error: `Resend API Error: ${response.statusText}` });
    }

    const data = await response.json();
    console.log("Resend Success:", data);

    res.json({ message: "Verification code sent" });
  } catch (err: any) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/verify-code", async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  const record = verificationCodes.get(email);

  if (!record) {
    return res
      .status(400)
      .json({ error: "No verification code found for this email" });
  }

  if (Date.now() > record.expiresAt) {
    verificationCodes.delete(email);
    return res.status(400).json({ error: "Verification code expired" });
  }

  if (record.code !== code) {
    return res.status(400).json({ error: "Invalid verification code" });
  }

  // Code is valid
  // Create user directly via Admin API (skips email confirmation)
  try {
    // Attempt to create the user
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: req.body.password,
      email_confirm: true,
      user_metadata: {
        username: req.body.username,
        phone_number: req.body.phoneNumber,
      },
    });

    if (createError) {
      // If user already exists, we assume they are the owner since they verified the email code.
      // We can't update password here without ID, but frontend will try to sign in.
      // If they forgot password, this flow doesn't handle reset, but assumes new signup.
      // If "User already registered", we proceed to let frontend sign in.
      if (
        createError.message.includes("already registered") ||
        createError.message.includes("exists")
      ) {
        // User exists. Verification successful.
      } else {
        console.error("Admin create user error:", createError);
        throw createError;
      }
    }

    verificationCodes.delete(email); // Invalidate code
    res.json({ message: "Verification successful", created: !createError });
  } catch (err: any) {
    console.error("Admin create error:", err);
    return res
      .status(500)
      .json({ error: "Failed to create verified user: " + err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
