import OpenAI from "openai";

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}

export async function analyzeTextOpenAI(text) {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI that detects scam and fake job messages.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return {
    verdict: "AI_ANALYZED",
    riskScore: 75,
    reasons: [response.choices[0].message.content],
    analyzedAt: new Date(),
  };
}
