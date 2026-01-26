let openai = null;

export function getOpenAIClient() {
  if (process.env.AI_MODE === "mock") {
    return null;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing in production");
  }

  if (!openai) {
    const OpenAI = (await import("openai")).default;
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openai;
}
