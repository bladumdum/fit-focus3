import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

app.use(limiter);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateWithRetry(model, prompt, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await model.generateContent([prompt]);
    } catch (err) {
      if (err.status === 503 && i < retries) {
        console.log("Retrying Gemini request...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        throw err;
      }
    }
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const { userMessage, healthContext } = req.body;

    if (!userMessage) {
      return res.status(400).json({
        error: "Pesan tidak boleh kosong",
      });
    }

    const formattedHealthContext = `
Mood: ${healthContext?.mood || "-"}
Tidur: ${healthContext?.sleep || "-"} jam
Fokus: ${healthContext?.focus || "-"}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Kamu adalah Fico AI Assistant milik Fit Focus.

Tugasmu:
- membantu produktivitas user
- membantu kesehatan mental ringan
- gunakan bahasa Indonesia santai
- jawaban singkat dan jelas

Data user:
${formattedHealthContext}

Pesan user:
${userMessage}
`;

    const result = await generateWithRetry(model, prompt);

    const text =
      result?.response?.text?.() ||
      "Maaf, terjadi kesalahan saat memproses jawaban.";

    res.json({
      reply: text,
    });
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    if (error.status === 503) {
      return res.json({
        reply: "AI sedang sibuk, coba lagi sebentar 🙏",
      });
    }

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
