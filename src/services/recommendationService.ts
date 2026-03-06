import { geminiModel } from "../config/geminiClient";
import type { PropType } from "../types";

// ─── Types ───────────────────────────────────────────────────────────
export interface RecommendationParams {
  moods: string[];
  budgetRange: string;
  partySize: string;
  foodPreferences: string[];
}

interface GeminiResponse {
  item_ids: number[];
  reasoning?: string;
}

// ─── Build the prompt for Gemini ─────────────────────────────────────
function buildPrompt(
  params: RecommendationParams,
  menuItems: (PropType & { category: string })[],
): string {
  // Build a concise menu summary for context
  const menuSummary = menuItems.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    rating: item.rating,
    tags: item.tag || [],
  }));

  return `You are a food recommendation AI for a restaurant app called EatEasy.

Given the customer's preferences below, select the 6-9 BEST matching menu items from the available menu.

## Customer Preferences
- **Moods**: ${params.moods.join(", ")}
- **Budget Range**: ${params.budgetRange}
- **Party Size**: ${params.partySize}
- **Food Type Preferences**: ${params.foodPreferences.length > 0 ? params.foodPreferences.join(", ") : "No specific preference"}

## Budget Guidelines
- "budget" = items under $12
- "moderate" = items $12-$25
- "premium" = items over $25
- "any" = no budget constraint

## Party Size Guidelines
- "solo" = 1 person, suggest individual portions
- "partner" = 2 people, suggest shareable or pair-friendly items
- "family" = 3+ people, suggest variety and shareable options
- "group" = 5+ people, suggest diverse selections

## Available Menu Items
${JSON.stringify(menuSummary, null, 0)}

## Instructions
1. Match items that fit the customer's mood, budget, party size, and food preferences
2. Prioritize items with high ratings
3. Include variety across categories when possible
4. Return ONLY valid item IDs from the menu above
5. Return 6-9 items

Respond with a JSON object in this exact format:
{
  "item_ids": [1, 2, 3, ...],
  "reasoning": "brief explanation of why these items were chosen"
}`;
}

// ─── Call Gemini to generate recommendations ─────────────────────────
export async function generateRecommendations(
  params: RecommendationParams,
  menuItems: (PropType & { category: string })[],
): Promise<number[]> {
  if (!menuItems.length) {
    console.error("[RecommendationAI] No menu items provided");
    throw new Error("No menu items available. Please try again later.");
  }

  console.debug("[RecommendationAI] Generating recommendations with params:", {
    moods: params.moods,
    budget: params.budgetRange,
    party: params.partySize,
    foodPrefs: params.foodPreferences,
    menuItemCount: menuItems.length,
  });

  const prompt = buildPrompt(params, menuItems);

  try {
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    console.debug("[RecommendationAI] Raw Gemini response:", responseText);

    // Parse the JSON response
    let parsed: GeminiResponse;
    try {
      parsed = JSON.parse(responseText);
    } catch (parseError) {
      console.error(
        "[RecommendationAI] Failed to parse JSON response:",
        parseError,
      );
      // Try to extract JSON from the response if it's wrapped in markdown
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("AI returned an invalid response format.");
      }
    }

    if (!parsed.item_ids || !Array.isArray(parsed.item_ids)) {
      console.error("[RecommendationAI] Invalid response structure:", parsed);
      throw new Error("AI returned an unexpected response structure.");
    }

    // Validate that all returned IDs exist in the menu
    const validIds = new Set(menuItems.map((item) => item.id));
    const filteredIds = parsed.item_ids.filter((id) => validIds.has(id));

    if (filteredIds.length === 0) {
      console.error("[RecommendationAI] No valid item IDs in response");
      throw new Error(
        "AI couldn't find matching items. Please try different preferences.",
      );
    }

    console.debug("[RecommendationAI] Recommended item IDs:", filteredIds);
    if (parsed.reasoning) {
      console.debug("[RecommendationAI] Reasoning:", parsed.reasoning);
    }

    return filteredIds;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("AI ")) {
      throw error; // Re-throw our own errors
    }
    console.error("[RecommendationAI] Gemini API error:", error);
    throw new Error(
      "Failed to generate recommendations. Please check your connection and try again.",
    );
  }
}
