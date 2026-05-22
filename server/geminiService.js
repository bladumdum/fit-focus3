import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Membangun teks konteks pengguna dari data fitur aplikasi Fit-Focus.
 * @param {object} ctx - Objek userContext dari frontend
 * @returns {string} - Blok teks yang disertakan dalam system prompt
 */
function buildUserContextBlock(ctx) {
  if (!ctx || typeof ctx !== "object") return "";

  const lines = [];

  // Mood
  if (ctx.mood) {
    const moodMap = {
      semangat: "Semangat 😄",
      biasa: "Biasa Aja 😐",
      biasaaja: "Biasa Aja 😐",
      lelah: "Lelah 😴",
      stress: "Stress 😤",
    };
    lines.push(`- Mood hari ini: ${moodMap[ctx.mood] ?? ctx.mood}`);
  } else {
    lines.push("- Mood hari ini: belum diisi");
  }

  // Hidrasi
  if (typeof ctx.waterIntake === "number") {
    const glasses = ctx.waterIntake;
    const goal = ctx.waterGoal ?? 8;
    const pct = Math.round((glasses / goal) * 100);
    lines.push(`- Hidrasi: ${glasses} dari ${goal} gelas (${pct}% target harian)`);
  }

  // Jam tidur
  if (typeof ctx.sleepHours === "number" && ctx.sleepHours > 0) {
    lines.push(`- Jam tidur tadi malam: ${ctx.sleepHours} jam`);
  }

  // Sesi Pomodoro
  if (typeof ctx.timerSessions === "number") {
    const preset = ctx.timerPreset ?? "Pomodoro";
    lines.push(`- Sesi fokus Pomodoro selesai hari ini: ${ctx.timerSessions} sesi (mode: ${preset})`);
  }

  // Status timer aktif
  if (ctx.timerRunning === true && typeof ctx.timerRemainingMin === "number") {
    lines.push(`- Timer sedang berjalan, sisa: ${ctx.timerRemainingMin} menit`);
  }

  // Todo
  if (typeof ctx.todoDone === "number" && typeof ctx.todoTotal === "number") {
    lines.push(`- Tugas hari ini: ${ctx.todoDone} dari ${ctx.todoTotal} selesai`);
  }

  // Daftar judul todo (opsional, jika dikirim)
  if (Array.isArray(ctx.todoTitles) && ctx.todoTitles.length > 0) {
    const list = ctx.todoTitles.slice(0, 5).map((t) => `  • ${t}`).join("\n");
    lines.push(`- Daftar tugas:\n${list}`);
  }

  if (lines.length === 0) return "";

  return `\n\n[DATA KONDISI PENGGUNA HARI INI]\n${lines.join("\n")}`;
}

/**
 * Menghasilkan respons streaming dari Gemini dengan konteks fitur Fit-Focus.
 * @param {string} userPrompt - Pesan dari pengguna
 * @param {function} onChunk - Callback per chunk teks (null = selesai)
 * @param {object} [userContext] - Data kondisi pengguna dari aplikasi
 */
export async function getFicoStreamResponse(userPrompt, onChunk, userContext = null) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️  GEMINI_API_KEY not set in server/.env");
  }
  const genAI = new GoogleGenerativeAI(apiKey);

  // Bangun blok data konteks pengguna
  const contextBlock = buildUserContextBlock(userContext);

  const systemInstruction =
    `Kamu adalah Fico — asisten pendamping fokus dan kesehatan di aplikasi Fit-Focus. ` +
    `Gunakan bahasa Indonesia yang santai, akrab, dan penuh empati. ` +
    `Jawaban singkat, jelas, dan praktis. ` +
    `Jika tersedia, selalu gunakan data kondisi pengguna di bawah untuk memberikan saran yang dipersonalisasi. ` +
    `Misalnya: jika hidrasi rendah, ingatkan untuk minum. Jika mood lelah/stress, berikan dukungan dan tips istirahat. ` +
    `Jika sesi Pomodoro sudah banyak, sarankan istirahat aktif. ` +
    `Jika ada data yang belum diisi (belum diketahui), tanyakan dengan ramah.` +
    contextBlock;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const fullPrompt = `System: ${systemInstruction}\n\nUser: ${userPrompt}`;

  // Panggil API Gemini (non-streaming, lalu emit chunk manual)
  const result = await model.generateContent([fullPrompt]);
  const text =
    result?.response?.text && typeof result.response.text === "function"
      ? result.response.text()
      : String(result?.response || "");

  // Stream ke consumer dalam potongan kecil
  const CHUNK_SIZE = 150; // karakter
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    const chunk = text.slice(i, i + CHUNK_SIZE);
    try {
      onChunk(chunk);
    } catch (e) {
      throw e;
    }
    // micro-yield agar caller bisa flush ke HTTP
    await new Promise((r) => setTimeout(r, 10));
  }

  // Sinyal selesai
  onChunk(null);
}

export default getFicoStreamResponse;