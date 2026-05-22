import React, { useState, useRef, useEffect } from "react";
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

// ── Chat Bubble ───────────────────────────────────────────────────────────────
function ChatBubble({ message, isUser }) {
    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 animate-fade-in`}
        >
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 mr-2 mt-1">
                    <img src={mascotSvg} alt="Fico" className="w-full h-full object-contain" />
                </div>
            )}
            <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isUser
                        ? "bg-[#006A4E] text-white rounded-br-none"
                        : "bg-white text-gray-700 rounded-bl-none border border-gray-100"
                    }`}
                style={{ fontFamily: "'Nunito', sans-serif" }}
            >
                {message}
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FicoAssistant() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        // Add user message
        setMessages((prev) => [...prev, { text: trimmed, isUser: true }]);
        setInput("");
        setIsTyping(true);

        // Simulate Fico AI response
        setTimeout(() => {
            setIsTyping(false);
            const responses = [
                "Aku Gay",
            ];
            const reply = responses[Math.floor(Math.random() * responses.length)];
            setMessages((prev) => [...prev, { text: reply, isUser: false }]);
        }, 1200);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isEmpty = messages.length === 0;

    return (
        <div
            className="flex flex-col h-full"
            style={{ minHeight: "calc(100vh - 4rem)", fontFamily: "'Nunito', sans-serif" }}
        >
            {/* ── Empty state: greeting + large mascot ── */}
            {isEmpty && (
                <div className="flex flex-col items-center justify-center flex-1 pb-32 select-none">
                    {/* Greeting */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-10 text-center">
                        Halo, Aku Fico Asisten AI Kamu!
                    </h1>

                    {/* Large Mascot */}
                    <div
                        className="w-56 h-56"
                        style={{ animation: "float 3s ease-in-out infinite" }}
                    >
                        <img
                            src={mascotSvg}
                            alt="Fico Mascot"
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                </div>
            )}

            {/* ── Chat history (shown after first message) ── */}
            {!isEmpty && (
                <div className="flex-1 overflow-y-auto px-2 py-4 pb-6">
                    {/* Small greeting at top of chat */}
                    <p className="text-center text-sm font-semibold text-gray-400 mb-6">
                        Halo, Aku Fico Asisten AI Kamu! 👋
                    </p>

                    {messages.map((msg, i) => (
                        <ChatBubble key={i} message={msg.text} isUser={msg.isUser} />
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex justify-start mb-3">
                            <div className="flex-shrink-0 w-8 h-8 mr-2 mt-1">
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

            {/* ── Input Bar (always at bottom) ── */}
            <div className="flex items-center gap-3 pt-4 pb-2">
                {/* Text input */}
                <div className="flex-1">
                    <input
                        id="fico-chat-input"
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Butuh teman cerita atau tips kesehatan?"
                        className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006A4E]/30 focus:border-[#006A4E] transition-all shadow-sm"
                    />
                </div>

                {/* Send Button */}
                <button
                    id="fico-send-btn"
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm hover:bg-[#006A4E] hover:text-white hover:border-[#006A4E] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                >
                    <SendIcon />
                </button>
            </div>

            {/* Float animation */}
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
