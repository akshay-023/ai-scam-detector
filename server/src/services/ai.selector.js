import { analyzeTextReal } from "./openai.service.js";

function analyzeTextMock(text) {
  const lower = text.toLowerCase();

  let verdict = "SAFE";
  let riskScore = 20;
  const reasons = [];

  if (
    lower.includes("urgent") ||
    lower.includes("immediately") ||
    lower.includes("send money") ||
    lower.includes("payment") ||
    lower.includes("fee")
  ) {
    verdict = "SUSPICIOUS";
    riskScore = 65;
    reasons.push("Urgency language detected");
    reasons.push("Potential scam pattern");
  }

  if (
    lower.includes("gift card") ||
    lower.includes("wire transfer") ||
    lower.includes("ssn") ||
    lower.includes("bank details") ||
    lower.includes("equipment fee")
  ) {
    verdict = "SCAM";
    riskScore = 90;
    reasons.push("High-risk payment or identity request");
  }

  if (reasons.length === 0) {
    reasons.push("No major scam indicators detected");
  }

  reasons.unshift("Mock analysis enabled");

  return {
    verdict,
    riskScore,
    reasons,
  };
}

export async function analyzeText(text) {
  console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY missing, using mock analysis");
      return analyzeTextMock(text);
    }

    const result = await analyzeTextReal(text);
    console.log("Using real OpenAI analysis");
    return result;
  } catch (error) {
    console.error("AI analysis failed, falling back to mock:", error.message);
    return analyzeTextMock(text);
  }
}