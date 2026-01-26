import { analyzeTextMock, analyzeTextReal } from "./ai.service.js";

export async function analyzeText(text) {
  if (process.env.AI_MODE === "real") {
    return analyzeTextReal(text);
  }

  // default → mock mode
  return analyzeTextMock(text);
}
