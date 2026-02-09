import dotenv from "dotenv";
dotenv.config();

console.log("VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY exists:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY,
);

try {
  const response = await fetch(process.env.VITE_SUPABASE_URL, {
    method: "HEAD",
  });
  console.log("Fetch status:", response.status);
} catch (error) {
  console.error("Fetch error:", error);
}
