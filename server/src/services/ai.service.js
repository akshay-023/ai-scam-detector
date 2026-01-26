export async function analyzeTextMock(text) {
  return {
    verdict: "SCAM",
    riskScore: 82,
    reasons: [
      "Urgent hiring language detected",
      "Asks for payment or fees",
      "No official company domain",
      "Too-good-to-be-true salary"
    ],
    analyzedAt: new Date()
  };
}
