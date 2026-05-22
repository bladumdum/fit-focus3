import React, { useEffect, useRef, useState } from "react";
import mascotSvg from "../../assets/icons/mascot.svg";

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

export default function StreamedAssistant() {
  const [input, setInput] = useState("");
  // Inisialisasi percakapan awal
  const [messages, setMessages] = useState([
    {
      text: "Halo! Aku Fico, asisten AI kamu dari Fit-Focus 😊 Ada yang ingin kamu ceritakan atau butuh tips produktivitas hari ini?",
      isUser: false,
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    setInput("");
    setLoading(true);

    // Tambah pesan user dan siapkan wadah kosong untuk respon Fico
    setMessages((prev) => [
      ...prev,
      { text: prompt, isUser: true },
      { text: "", isUser: false },
    ]);

    try {
      // Memanggil backend lokal
      const response = await fetch("http://localhost:3000/api/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Gagal terhubung ke server backend");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      // Membaca stream chunk dari backend
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
            
            // 1. Coba parse JSON-nya dulu
            try {
              parsedData = JSON.parse(dataStr);
            } catch (err) {
              console.error("Gagal parsing JSON stream:", err);
              continue; // Lewati baris ini jika JSON rusak
            }

            // 2. Jika ada error dari backend, lempar ke catch utama!
            if (parsedData.error) {
              throw new Error(parsedData.error);
            } 
            
            // 3. Jika berhasil mendapat chunk, masukkan ke pesan
            if (parsedData.chunk) {
              setMessages((prev) => {
                const copy = [...prev];
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
        const copy = [...prev];
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
                {m.text}
              </div>
            </div>
          ))}

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

      <div className="flex items-center gap-3 pt-4 pb-2 mt-auto">
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
          onClick={handleSend}
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