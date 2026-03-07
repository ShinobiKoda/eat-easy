import { supabase } from "../config/supabaseClient";

// ─── Types ───────────────────────────────────────────────────────────
export interface Recommendation {
  id: string;
  user_id: string;
  moods: string[];
  budget_range: string;
  party_size: string;
  food_preferences: string[];
  item_ids: number[];
  created_at: string;
}

export interface RecommendationInput {
  moods: string[];
  budgetRange: string;
  partySize: string;
  foodPreferences: string[];
  itemIds: number[];
}

// ─── Fetch latest recommendation for the current user ────────────────
export async function getLatestRecommendation(): Promise<Recommendation | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("[RecommendationHistory] Auth error:", authError);
    return null;
  }

  console.debug("[RecommendationHistory] Fetching latest for user:", user.id);

  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // PGRST116 = no rows found — not a real error
    if (error.code === "PGRST116") {
      console.debug(
        "[RecommendationHistory] No previous recommendations found",
      );
      return null;
    }
    console.error("[RecommendationHistory] Fetch error:", error);
    return null;
  }

  console.debug("[RecommendationHistory] Found recommendation:", data.id);
  return data as Recommendation;
}

// ─── Save a new recommendation ───────────────────────────────────────
export async function saveRecommendation(
  input: RecommendationInput,
): Promise<Recommendation | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("[RecommendationHistory] Auth error on save:", authError);
    throw new Error("You must be logged in to save recommendations.");
  }

  console.debug(
    "[RecommendationHistory] Saving recommendation for user:",
    user.id,
  );

  const { data, error } = await supabase
    .from("recommendations")
    .insert({
      user_id: user.id,
      moods: input.moods,
      budget_range: input.budgetRange,
      party_size: input.partySize,
      food_preferences: input.foodPreferences,
      item_ids: input.itemIds,
    })
    .select()
    .single();

  if (error) {
    console.error("[RecommendationHistory] Save error:", error);
    throw new Error("Failed to save recommendation. Please try again.");
  }

  console.debug("[RecommendationHistory] Saved successfully:", data.id);
  return data as Recommendation;
}

// ─── Check if user has any recommendations ───────────────────────────
export async function hasRecommendations(): Promise<boolean> {
  const rec = await getLatestRecommendation();
  return rec !== null;
}
