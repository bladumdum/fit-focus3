import { GoogleGenerativeAI } from "@google/generative-ai";

// Prefer Vite-style env var if provided, fall back to GEMINI_API_KEY
const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// getFicoStreamResponse(prompt, onChunk)
// - prompt: string (user message)
// - onChunk: function called for each chunk: onChunk(chunk) where chunk is string
// The implementation uses the SDK to generate a full response then streams
// it in small chunks via the onChunk callback to emulate streaming behavior.
export async function getFicoStreamResponse(userPrompt, onChunk) {
  const systemInstruction = `Kamu adalah Fico — asisten pendamping fokus dan kesehatan yang ramah. Gunakan bahasa Indonesia, jawaban singkat, jelas, dan penuh empati. Berikan saran praktis untuk fokus, hidrasi, dan istirahat jika relevan.`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const fullPrompt = `System: ${systemInstruction}\n\nUser: ${userPrompt}`;

  // Use the non-streaming SDK call to get the full text, then emit chunks.
  const result = await model.generateContent([fullPrompt]);
  const text = (result?.response?.text && typeof result.response.text === "function")
    ? result.response.text()
    : String(result?.response || "");

  // Stream in small chunks to the consumer
  const CHUNK_SIZE = 150; // chars
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    const chunk = text.slice(i, i + CHUNK_SIZE);
    try {
      onChunk(chunk);
    } catch (e) {
      // consumer aborted or errored
      throw e;
    }
    // small micro-yield so caller can flush
    await new Promise((r) => setTimeout(r, 10));
  }

  // signal end with null
  onChunk(null);
}

export default getFicoStreamResponse;
