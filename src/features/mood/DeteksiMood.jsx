import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useMood } from "../../contexts/MoodContext";
import useWellnessStore from "../../store/useWellnessStore";
import smallMascot from "../../assets/icons/smallMascot.svg";

export default function DeteksiMood() {
  const [input, setInput] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  
  const { setTodayMood, MOOD_OPTIONS } = useMood();
  const setMood = useWellnessStore((s) => s.setMood);
  const checkAndResetDaily = useWellnessStore((s) => s.checkAndResetDaily);
  const navigate = useNavigate();

  useEffect(() => {
    checkAndResetDaily();
  }, [checkAndResetDaily]);

  // Simple keyword-based mood detection algorithm
  const detectMood = (text) => {
    const lower = text.toLowerCase();
    
    if (lower.match(/(semangat|senang|bahagia|happy|excited|siap|bagus|baik)/)) {
      return "semangat";
    }
    if (lower.match(/(lelah|cape|capek|ngantuk|pusing|sakit|kurang tidur)/)) {
      return "lelah";
    }
    if (lower.match(/(stress|stres|marah|kesal|banyak tugas|berat|pusing banget|panik)/)) {
      return "stress";
    }
    // Default fallback
    return "biasa";
  };

  const handleAnalyze = () => {
    if (!input.trim()) return;
    
    setIsDetecting(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const result = detectMood(input);
      setDetectedMood(result);
      setIsDetecting(false);
    }, 1500);
  };

  const handleSaveAndContinue = () => {
    if (detectedMood) {
      setMood(detectedMood);
      setTodayMood(detectedMood);
      navigate("/"); // Go to dashboard
    }
  };

  const moodData = detectedMood ? MOOD_OPTIONS.find((m) => m.id === detectedMood) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4DD] p-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-60"></div>
        
        <header className="mb-8 text-center relative z-10">
          <div className="w-20 h-20 mx-auto bg-[#95D598] rounded-2xl flex items-center justify-center mb-5 border-2 border-black shadow-sm transform -rotate-3">
            <img src={smallMascot} alt="Fico Mascot" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-[#1A365D] tracking-tight">Ceritakan Harimu</h1>
          <p className="text-[#4A65A4] mt-2 font-medium">
            Tuliskan perasaanmu saat ini, biar Fico tebak mood kamu!
          </p>
        </header>

        <main className="relative z-10 flex flex-col gap-6">
          {!detectedMood && !isDetecting && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Contoh: Hari ini aku ngerasa lelah banget karena begadang ngerjain tugas..."
                className="w-full h-32 p-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#006A4E] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#006A4E]/10 transition-all resize-none text-gray-700"
              />
              <button
                onClick={handleAnalyze}
                disabled={!input.trim()}
                className="w-full py-3.5 bg-[#006A4E] text-white rounded-full font-bold text-lg hover:bg-[#00523b] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                Analisis Mood
              </button>
            </div>
          )}

          {isDetecting && (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
              <div className="flex gap-2 mb-4">
                <span className="w-3 h-3 bg-[#006A4E] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-3 h-3 bg-[#006A4E] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-3 h-3 bg-[#006A4E] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
              <p className="text-[#4A65A4] font-bold animate-pulse">Fico sedang membaca ceritamu...</p>
            </div>
          )}

          {detectedMood && !isDetecting && (
            <div className="flex flex-col items-center text-center animate-fade-in bg-[#f5f8f5] border-2 border-[#95D598] p-6 rounded-3xl">
              <span className="text-6xl mb-3">{moodData?.emoji}</span>
              <h2 className="text-2xl font-black text-[#006A4E] mb-2">
                Mood Kamu: {moodData?.label}
              </h2>
              <p className="text-gray-600 mb-6 text-sm px-4">
                Berdasarkan ceritamu, Fico mendeteksi bahwa kamu sedang merasa <strong className="text-gray-800">{moodData?.label}</strong> hari ini.
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setDetectedMood(null);
                    setInput("");
                  }}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Tulis Ulang
                </button>
                <button
                  onClick={handleSaveAndContinue}
                  className="flex-1 py-3 bg-[#006A4E] text-white rounded-full font-bold shadow-md hover:bg-[#00523b] hover:shadow-lg transition-all"
                >
                  Lanjut ke Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
