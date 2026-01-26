import { analyzeTextMock } from "./ai.service.js";

export async function analyzeText(text) {
  if (process.env.AI_MODE === "openai") {
    const { analyzeTextOpenAI } = await import("./openai.service.js");
    return analyzeTextOpenAI(text);
  }

  // default → mock
  return analyzeTextMock(text);
}
