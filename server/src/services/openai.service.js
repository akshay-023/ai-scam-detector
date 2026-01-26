let openaiClient = null;

export async function getOpenAIClient() {
  if (process.env.AI_MODE === "mock") {
    return null;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing");
  }

  if (!openaiClient) {
    const { default: OpenAI } = await import("openai");

    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
}
