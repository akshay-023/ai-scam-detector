import { analyzeTextMock, analyzeTextReal } from "./ai.service.js";

/**
 * Selects AI mode safely based on environment
 * Supported modes:
 * - mock (no OpenAI call)
 * - real (uses OpenAI API)
 */
export async function analyzeText(text) {
  const mode = process.env.AI_MODE || "mock";

  if (mode === "mock") {
    return analyzeTextMock(text);
  }

  return analyzeTextReal(text);
}
