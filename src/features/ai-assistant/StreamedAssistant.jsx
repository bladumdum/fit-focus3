import React, { useEffect, useRef, useState } from "react";
import mascotSvg from "../../assets/icons/mascot.svg";

// Context & Store imports
import { useMood } from "../../contexts/MoodContext";
import { useTimer } from "../../contexts/TimerContext";
import { useApp } from "../../contexts/AppContext";
import useWellnessStore from "../../store/useWellnessStore";

// ── Send Icon ─────────────────────────────────────────────────────────────────
function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ── Quick Suggestion Chips ─────────────────────────────────────────────────────
const SUGGESTION_CHIPS = [
  { emoji: "💧", label: "Tips Hidrasi",   prompt: "Berikan tips agar aku lebih rajin minum air putih hari ini." },
  { emoji: "🧘", label: "Tips Fokus",     prompt: "Aku susah fokus, bantu aku dengan tips meningkatkan konsentrasi." },
  { emoji: "😤", label: "Atasi Stress",   prompt: "Aku lagi stress banget, ada tips untuk menenangkan diri?" },
  { emoji: "⏱️", label: "Jadwal Pomodoro", prompt: "Bantu aku buat jadwal sesi Pomodoro yang produktif hari ini." },
  { emoji: "🌙", label: "Perbaiki Tidur", prompt: "Aku kurang tidur, apa yang harus aku lakukan supaya lebih berenergi?" },
  { emoji: "✅", label: "Prioritas Tugas", prompt: "Bantu aku menentukan prioritas tugas yang harus dikerjakan duluan." },
];

// ── Markdown-lite renderer (bold & newline) ────────────────────────────────────
function renderText(text) {
  if (!text) return null;
  // Split on **bold** markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Render newlines as <br/>
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

const INITIAL_MESSAGE = [
  {
    text: "Halo! Aku Fico, asisten AI kamu dari Fit-Focus 😊 Ada yang ingin kamu ceritakan atau butuh tips produktivitas hari ini?",
    isUser: false,
  },
];

const SESSION_KEY = "fico_chat_messages";

/** Restore messages dari sessionStorage, atau pakai pesan awal */
function loadMessages() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return INITIAL_MESSAGE;
}

export default function StreamedAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(loadMessages);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ── Baca semua konteks fitur aplikasi ─────────────────────────────────────
  // Mood — utamakan wellnessStore (persisted ke localStorage), fallback MoodContext
  const { mood: moodCtx } = useMood();
  const wellnessMood = useWellnessStore((s) => s.currentMood);

  // Timer (Pomodoro)
  const { preset, running, remaining } = useTimer();

  // App Context (todo, sessions)
  const { todos, timerSessions } = useApp();

  // Wellness store (hidrasi, tidur)
  const waterIntake = useWellnessStore((s) => s.waterIntake);
  const sleepHours  = useWellnessStore((s) => s.sleepHours);

  // ── Simpan messages ke sessionStorage setiap kali berubah ─────────────────
  useEffect(() => {
    try {
      // Jangan simpan pesan yang masih streaming (text kosong di akhir)
      const toSave = messages.filter((m, i) =>
        !(i === messages.length - 1 && !m.isUser && m.text === "")
      );
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(toSave));
    } catch (_) {}
  }, [messages]);

  // ── Bangun objek userContext dari semua data tersebut ─────────────────────
  function buildUserContext() {
    const todoDone   = todos.filter((t) => t.done).length;
    const todoTotal  = todos.length;
    const todoTitles = todos.slice(0, 5).map((t) => t.title);

    // Mood: wellnessStore (persisted) lebih andal daripada in-memory MoodContext
    const resolvedMood = wellnessMood ?? moodCtx?.today ?? null;

    return {
      mood:              resolvedMood,
      waterIntake,
      waterGoal:         8,
      sleepHours,
      timerSessions:     timerSessions ?? 0,
      timerPreset:       preset?.label ?? "Pomodoro",
      timerRunning:      running,
      timerRemainingMin: Math.ceil(remaining / 60),
      todoDone,
      todoTotal,
      todoTitles,
    };
  }

  // Auto-scroll ke bawah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (overridePrompt) => {
    const prompt = (overridePrompt ?? input).trim();
    if (!prompt || loading) return;

    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { text: prompt, isUser: true },
      { text: "", isUser: false },
    ]);

    try {
      const userContext = buildUserContext();

      const response = await fetch("http://localhost:3000/api/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userContext }),
      });

      if (!response.ok) throw new Error("Gagal terhubung ke server backend");

      const reader  = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        const lines = chunkText.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (!dataStr || dataStr === "{}") continue;

            let parsedData;
            try {
              parsedData = JSON.parse(dataStr);
            } catch (err) {
              console.error("Gagal parsing JSON stream:", err);
              continue;
            }

            if (parsedData.error) {
              throw new Error(parsedData.error);
            }

            if (parsedData.chunk) {
              setMessages((prev) => {
                const copy    = [...prev];
                const lastIdx = copy.length - 1;
                copy[lastIdx] = {
                  ...copy[lastIdx],
                  text: (copy[lastIdx].text || "") + parsedData.chunk,
                };
                return copy;
              });
            }
          }
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setMessages((prev) => {
        const copy    = [...prev];
        const lastIdx = copy.length - 1;
        copy[lastIdx] = {
          ...copy[lastIdx],
          text: "Maaf ya, server backend Fico lagi error 🤕 Coba lagi sebentar ya!",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-transparent" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* ── Empty state ─────────────────────────────────────────────────────── */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center flex-1 pb-32 select-none animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Halo, Aku Fico Asisten AI Kamu!
          </h1>
          <div className="w-56 h-56" style={{ animation: "float 3s ease-in-out infinite" }}>
            <img src={mascotSvg} alt="Fico Mascot" className="w-full h-full object-contain drop-shadow-lg" />
          </div>
        </div>
      )}

      {/* ── Chat messages ────────────────────────────────────────────────────── */}
      {!isEmpty && (
        <div className="flex-1 overflow-y-auto px-2 py-4 pb-6">
          <p className="text-center text-sm font-semibold text-gray-400 mb-6">
            Halo, Aku Fico Asisten AI Kamu! 👋
          </p>

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.isUser ? "justify-end" : "justify-start"} mb-3 animate-fade-in`}>
              {!m.isUser && (
                <div className="shrink-0 w-8 h-8 mr-2 mt-1">
                  <img src={mascotSvg} alt="Fico" className="w-full h-full object-contain" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${m.isUser
                    ? "bg-[#006A4E] text-white rounded-br-none"
                    : "bg-white text-gray-700 rounded-bl-none border border-gray-100"
                  }`}
              >
                {m.isUser ? m.text : renderText(m.text)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && messages[messages.length - 1]?.text === "" && (
            <div className="flex justify-start mb-3 animate-fade-in">
              <div className="shrink-0 w-8 h-8 mr-2 mt-1">
                <img src={mascotSvg} alt="Fico" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1 items-center">
                <span className="w-2 h-2 bg-[#006A4E] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#006A4E] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#006A4E] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* ── Quick Suggestion Chips ───────────────────────────────────────────── */}
      {!loading && (
        <div className="flex flex-wrap gap-2 px-1 pb-3 mt-auto">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip.label}
              id={`chip-${chip.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => handleSend(chip.prompt)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-600 shadow-sm hover:bg-[#006A4E] hover:text-white hover:border-[#006A4E] transition-all duration-200 active:scale-95 disabled:opacity-40"
            >
              <span>{chip.emoji}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Input bar ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-2 pb-2">
        <div className="flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Butuh teman cerita atau tips kesehatan?"
            disabled={loading}
            className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006A4E]/30 focus:border-[#006A4E] transition-all shadow-sm disabled:opacity-70"
          />
        </div>

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="shrink-0 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm hover:bg-[#006A4E] hover:text-white hover:border-[#006A4E] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          <SendIcon />
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}