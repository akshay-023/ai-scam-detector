import OpenAI from "openai";

let client = null;

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in .env");
  }

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}

export async function analyzeTextReal(text) {
  const openai = getClient();

  const prompt = `
You are an expert fraud analyst specializing in job scams, recruiter scams, phishing, and suspicious employment messages.

Analyze the following text and respond ONLY in valid JSON with this exact format:

{
  "verdict": "SAFE | SUSPICIOUS | SCAM",
  "riskScore": number between 0 and 100,
  "reasons": ["short bullet points"]
}

Rules:
- Return only JSON
- No markdown
- No explanation outside JSON
- Keep reasons short and specific
- Base the result only on the message content

Text:
"""${text}"""
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: "You are a precise scam detection assistant that returns strict JSON only.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error("Invalid JSON from OpenAI:", content);
    throw new Error("OpenAI returned invalid JSON");
  }

  return parsed;
}