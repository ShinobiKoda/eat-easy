import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "[Gemini] Missing VITE_GEMINI_API_KEY in environment variables",
  );
}

const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * Shared Gemini model instance.
 * Using gemini-2.0-flash for fast, cost-effective responses.
 */
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 1024,
    responseMimeType: "application/json",
  },
});

export default genAI;
