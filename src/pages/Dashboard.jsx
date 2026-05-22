import React, { useEffect, useRef, useState } from "react";
import PomodoroTimeOut from "../features/Pomodoro/PomodoroTimeOut";
import PomodoroPopUp from "../features/Pomodoro/PomodoroPopUp";
import smallMascot from "../assets/icons/smallMascot.svg";

// ── Timer presets ─────────────────────────────────────────────────────────────
const PRESETS = [
  { id: "pomodoro", label: "Pomodoro", minutes: 25 },
  { id: "short",    label: "Short Break", minutes: 5 },
  { id: "long",     label: "Long Break", minutes: 15 },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  // ── Timer state ──
  const [preset, setPreset]           = useState(PRESETS[0]);
  const [running, setRunning]         = useState(false);
  const [remaining, setRemaining]     = useState(PRESETS[0].minutes * 60);
  const [showTimeout, setShowTimeout] = useState(false);
  const [showPopup, setShowPopup]     = useState(false);
  const intervalRef                   = useRef(null);

  // Reset when preset changes
  useEffect(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(preset.minutes * 60);
  }, [preset]);

  // Countdown tick
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setShowTimeout(true); // 🔔 trigger toast
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const total    = preset.minutes * 60;
  const progress = 1 - remaining / total;           // 0 → 1

  const handleStartPause = () => setRunning((r) => !r);
  const handleReset      = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(preset.minutes * 60);
  };
  // 🧪 Test button — completes the timer immediately
  const handleFinishNow  = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(0);
    setShowTimeout(true);
  };

  // Next break text
  const nextBreakMin = Math.ceil(remaining / 60);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header Profile */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-black">
          <img src={smallMascot} alt="mascot" className="w-full h-full object-contain bg-[#90d2a4]" />
        </div>
        <h1 className="text-3xl font-bold text-[#1F4B3F]">Halo, Alex!</h1>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Kolom Kiri: Pomodoro Health ── */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] shadow-sm p-8 flex flex-col items-center border border-gray-100">
          <h2 className="text-xl font-bold text-[#1A365D] mb-4">Pomodoro Health</h2>

          {/* Preset Switcher */}
          <div className="flex gap-2 mb-6">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                id={`preset-${p.id}`}
                onClick={() => setPreset(p)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors
                  ${preset.id === p.id
                    ? "bg-[#006A4E] text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Countdown display */}
          <div className="text-7xl font-bold text-[#20409A] mb-6 tracking-tighter tabular-nums">
            {formatTime(remaining)}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8 border border-gray-100 overflow-hidden">
            <div
              className="bg-[#006A4E] h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              id="pomodoro-start-pause"
              onClick={handleStartPause}
              className="px-6 py-2 border-2 border-[#006A4E] rounded-full text-[#006A4E] font-semibold hover:bg-green-50 text-sm transition-colors"
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              id="pomodoro-reset"
              onClick={handleReset}
              className="px-6 py-2 border-2 border-gray-300 rounded-full text-gray-500 font-semibold hover:bg-gray-50 text-sm transition-colors"
            >
              Reset
            </button>
          </div>

          {/* 🧪 Test button */}
          <button
            id="pomodoro-finish-now"
            onClick={handleFinishNow}
            className="mb-6 px-4 py-1.5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 text-xs font-bold hover:bg-yellow-200 transition-colors"
          >
            ⚡ Selesaikan Timer Sekarang (Tes Notif)
          </button>

          {/* Next break info */}
          <div className="text-center mb-8">
            <p className="text-[#20409A] font-medium mb-1">Istirahat Aktif Mendatang</p>
            <p className="text-[#4A65A4] text-sm">
              {remaining > 0 ? `In ${nextBreakMin} Minute${nextBreakMin !== 1 ? "s" : ""}` : "Waktu habis!"}
            </p>
          </div>

          {/* Mascot + mood */}
          <div className="mt-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border-2 border-black overflow-hidden bg-[#90d2a4]">
              <img src={smallMascot} alt="fico" className="w-full h-full object-contain" />
            </div>
            <span className="text-[#20409A] font-bold text-xl">Semangat !</span>
          </div>
        </div>

        {/* ── Kolom Kanan: Widget Grid ── */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Widget: Hidrasi */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3">Hidrasi</h3>
              <div className="bg-white rounded-[1.5rem] shadow-sm p-6 border border-gray-100 h-36 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#20409A]">4 Glass</span>
                  <button className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-lg hover:bg-gray-50">
                    +
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2 border border-black">
                  <div className="bg-[#20409A] h-full rounded-full" style={{ width: "50%" }} />
                </div>
                <p className="text-xs text-[#4A65A4] text-center mt-1">Hydration for today : 4/8</p>
              </div>
            </div>

            {/* Widget: To-do Today */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3">To - do Today</h3>
              <div className="bg-white rounded-[1.5rem] shadow-sm p-6 border border-gray-100 h-36 flex flex-col justify-between">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <span className="text-xs text-gray-700">Tugas Projek uas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <span className="text-xs text-gray-700">Projek SKS pak oni</span>
                  </li>
                </ul>
                <button className="w-full py-1.5 mt-2 border border-gray-300 rounded-full text-xs text-gray-600 font-semibold hover:bg-gray-50">
                  + Tambah Task
                </button>
              </div>
            </div>
          </div>

          {/* Widget: Statistik Hari Ini */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-gray-800 font-semibold mb-3">Statistik Hari Ini</h3>
            <div className="bg-white rounded-[1.5rem] shadow-sm p-6 border border-gray-100 flex-1 flex flex-col">
              <div className="flex justify-around text-xs text-gray-500 mb-4">
                <span>Sesi 1</span>
                <span>Sesi 2</span>
                <span>Sesi 3</span>
              </div>
              <div className="relative flex-1 w-full border-l border-b border-gray-200 mt-2">
                <div className="absolute -left-6 bottom-0 text-xs text-gray-400">0</div>
                <div className="absolute -left-6 bottom-[25%] text-xs text-gray-400">4</div>
                <div className="absolute -left-6 bottom-[50%] text-xs text-gray-400">8</div>
                <div className="absolute -left-6 bottom-[75%] text-xs text-gray-400">12</div>
                <div className="absolute -left-6 top-0 text-xs text-gray-400">20</div>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 20,20 Q 40,90 50,100 T 80,100" fill="none" stroke="#D8D4F2" strokeWidth="3" />
                  <path d="M 20,20 Q 40,90 50,100 T 80,100 L 80,100 L 20,100 Z" fill="#EBE9F8" opacity="0.5" />
                  <circle cx="20" cy="20" r="2" fill="white" stroke="#A89FDF" strokeWidth="1.5" />
                  <circle cx="50" cy="100" r="2" fill="white" stroke="#A89FDF" strokeWidth="1.5" />
                  <circle cx="80" cy="100" r="2" fill="white" stroke="#A89FDF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Tips */}
      <div className="bg-[#F8F9FA] rounded-[1.5rem] shadow-sm border border-gray-200 p-2 flex items-center gap-4 mt-2">
        <div className="bg-white px-8 py-3 rounded-xl border border-gray-200 text-lg">Tips</div>
        <p className="text-gray-800 text-sm md:text-base pr-4">
          Fokus pada satu hal dalam satu waktu untuk hasil yang lebih maksimal
        </p>
      </div>

      {/* 🔔 Pomodoro timeout notification */}
      <PomodoroTimeOut
        visible={showTimeout}
        onClose={() => setShowTimeout(false)}
        onOpenPopup={() => setShowPopup(true)}
      />

      {/* 🎬 Pomodoro stretching popup */}
      {/* To add video: import relaxVideo from "../assets/videos/relaksasi_stretching.mp4" and pass videoSrc={relaxVideo} */}
      <PomodoroPopUp
        visible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}