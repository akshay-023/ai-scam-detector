/**
 * MOCK AI ANALYSIS
 * Used when AI_MODE=mock
 */
export function analyzeTextMock(text) {
  return {
    verdict: "SUSPICIOUS",
    riskScore: 65,
    reasons: [
      "Mock analysis enabled",
      "Urgency language detected",
      "Potential scam pattern"
    ],
  };
}

/**
 * REAL AI ANALYSIS
 * Used when AI_MODE=real
 */
export async function analyzeTextReal(text) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const OpenAI = (await import("openai")).default;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are an expert fraud analyst.

Analyze the following text and respond ONLY in JSON:

{
  "verdict": "SAFE | SUSPICIOUS | SCAM",
  "riskScore": number between 0 and 100,
  "reasons": ["short bullet points"]
}

Text:
"""${text}"""
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return JSON.parse(response.choices[0].message.content);
}
