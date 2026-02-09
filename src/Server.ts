// DNS configuration MUST be first before any network imports
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5174;

// Supabase config
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

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

  // Professional email template matching website colors
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f6f9;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f6f6f9;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(50, 50, 77, 0.08);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #615793 0%, #4a4a6a 100%); border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                🍽️ Eat Easy
              </h1>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px 0; color: #32324d; font-size: 16px; line-height: 1.6;">
                Hi there! 👋
              </p>
              <p style="margin: 0 0 32px 0; color: #666687; font-size: 15px; line-height: 1.6;">
                You requested a verification code to complete your sign up. Enter this code to verify your email address:
              </p>
              
              <!-- Code box with gradient border -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #FFB01D 0%, #FF7B2C 100%); border-radius: 12px; padding: 3px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="background-color: #FFF2EA; border-radius: 10px; padding: 24px; text-align: center;">
                          <span style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #32324d; font-family: 'Courier New', monospace;">
                            ${code}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Timer notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #ebeaf2; border-radius: 8px; padding: 16px 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <span style="font-size: 20px;">⏱️</span>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; color: #615793; font-size: 14px; font-weight: 600;">
                            This code expires in 10 minutes
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f6f6f9; border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #8e8ea9; font-size: 13px;">
                Didn't request this code? You can safely ignore this email.
              </p>
              <p style="margin: 0; color: #a5a5ba; font-size: 12px;">
                © ${new Date().getFullYear()} Eat Easy. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    // Using axios instead of fetch
    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from: "Eat Easy <auth@sir-p.tech>",
        to: [email],
        subject: "🔐 Your Verification Code - Eat Easy",
        html: emailHtml,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        timeout: 30000, // 30 second timeout
      },
    );

    console.log("Resend Success:", response.data);
    res.json({ message: "Verification code sent" });
  } catch (err: any) {
    console.error("Server error:", err.response?.data || err.message);
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
  // Create user directly via Supabase Admin REST API using axios
  try {
    const createUserPayload = {
      email: email,
      password: req.body.password,
      email_confirm: true,
      user_metadata: {
        username: req.body.username,
        phone_number: req.body.phoneNumber,
      },
    };

    const response = await axios.post(
      `${supabaseUrl}/auth/v1/admin/users`,
      createUserPayload,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
        timeout: 30000, // 30 second timeout
      },
    );

    console.log("User created:", response.data.id);
    verificationCodes.delete(email); // Invalidate code
    res.json({ message: "Verification successful", created: true });
  } catch (err: any) {
    // Check if user already exists
    const errorMessage =
      err.response?.data?.msg || err.response?.data?.message || err.message;

    if (
      errorMessage?.includes("already registered") ||
      errorMessage?.includes("already been registered") ||
      err.response?.status === 422
    ) {
      // User exists - we need to confirm their email
      console.log("User already exists, confirming email...");

      try {
        // First, get the user by email
        const listResponse = await axios.get(
          `${supabaseUrl}/auth/v1/admin/users`,
          {
            headers: {
              apikey: supabaseServiceKey,
              Authorization: `Bearer ${supabaseServiceKey}`,
            },
            timeout: 30000,
          },
        );

        const existingUser = listResponse.data.users?.find(
          (u: any) => u.email === email,
        );

        if (existingUser) {
          // Update the user to confirm their email
          await axios.put(
            `${supabaseUrl}/auth/v1/admin/users/${existingUser.id}`,
            { email_confirm: true },
            {
              headers: {
                "Content-Type": "application/json",
                apikey: supabaseServiceKey,
                Authorization: `Bearer ${supabaseServiceKey}`,
              },
              timeout: 30000,
            },
          );
          console.log("Email confirmed for existing user:", existingUser.id);
        }
      } catch (updateErr: any) {
        console.error(
          "Failed to confirm email for existing user:",
          updateErr.response?.data || updateErr.message,
        );
      }

      verificationCodes.delete(email);
      return res.json({ message: "Verification successful", created: false });
    }

    console.error("Admin create error:", err.response?.data || err.message);
    return res
      .status(500)
      .json({ error: "Failed to create verified user: " + errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
