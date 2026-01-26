import OpenAI from "openai";

let client = null;

function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "mock"
    });
  }
  return client;
}

export async function analyzeTextReal(text) {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a scam detection expert." },
      { role: "user", content: text }
    ]
  });

  return response.choices[0].message.content;
}
