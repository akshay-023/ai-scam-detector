import { getOpenAIClient } from "./openai.service.js";

export async function analyzeScamText(text) {
  if (process.env.AI_MODE === "mock") {
    return {
      verdict: "SUSPICIOUS",
      riskScore: 72,
      reasons: [
        "Urgent language detected",
        "Unverified recruiter",
        "Requests personal information"
      ]
    };
  }

  const openai = await getOpenAIClient();

  // real OpenAI logic here (future)
}
