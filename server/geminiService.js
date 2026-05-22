import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFicoStreamResponse(userPrompt, onChunk) {
  // Pindahkan pemanggilan env dan inisiasi AI ke dalam fungsi ini
  // Saat fungsi ini dipanggil, dotenv di index.js sudah selesai berjalan
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️  GEMINI_API_KEY not set in server/.env");
  }
  const genAI = new GoogleGenerativeAI(apiKey);

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