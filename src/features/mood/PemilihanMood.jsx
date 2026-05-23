import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Check } from "lucide-react";
import semangat from "../../assets/icons/Semangat Emot.svg";
import biasa from "../../assets/icons/Biasa Aja Emot.svg";
import lelah from "../../assets/icons/Lelah Emot.svg";
import { useNavigate } from "react-router-dom";
import stress from "../../assets/icons/Stress Emot.svg";
import mascot from "../../assets/icons/mascot.svg";
import smallMascot from "../../assets/icons/smallMascot.svg";
import calmingNature from "../../assets/images/calming_nature.png";
import useWellnessStore from "../../store/useWellnessStore";
import { useMood } from "../../contexts/MoodContext";
import { useTimer } from "../../contexts/TimerContext";

const MOODS = [
  { id: "semangat", label: "Semangat", icon: semangat },
  { id: "biasa",    label: "Biasa Aja", icon: biasa },
  { id: "lelah",    label: "Lelah",     icon: lelah },
  { id: "stress",   label: "Stress",    icon: stress },
];

// ── Stress Recovery Popup ──────────────────────────────────────────────────────
// 5-step flow: Alert → Confirm → Breathing 1 → Breathing 2 → Calming Screen
function StressPopup({ onFinish, onSkip }) {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center"
        style={{ animation: "popIn 0.3s cubic-bezier(.34,1.56,.64,1)" }}
      >

        {/* ── Step 1: Alert ── */}
        {step === 1 && (
          <>
            <img src={mascot} alt="Fico" className="w-28 h-28 object-contain mb-5" />
            <h2 className="text-xl font-black text-gray-900 mb-3 leading-snug">
              Sepertinya kamu sedang<br />mengalami stress
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Yuk, ambil waktu sejenak untuk<br />wellnes recovery
            </p>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-full bg-[#1B6B45] text-white font-bold text-sm mb-3 hover:bg-[#145236] transition-all active:scale-[0.98]"
            >
              Istirahat Dulu
            </button>
            <button
              onClick={onSkip}
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Nanti Saja
            </button>
          </>
        )}

        {/* ── Step 2: Confirm Relax Mode ── */}
        {step === 2 && (
          <>
            <div className="relative mb-5">
              <img src={smallMascot} alt="Fico" className="w-28 h-28 object-contain" />
              <span className="absolute -top-1 -right-3 text-2xl font-black text-gray-900">?</span>
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-3">
              Istirahat Dahulu ?
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Kamu bisa melakukan Relax Mode<br />untuk merasa lebih tenang
            </p>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-full bg-[#1B6B45] text-white font-bold text-sm mb-3 hover:bg-[#145236] transition-all active:scale-[0.98]"
            >
              Mulai Relax Mode
            </button>
            <button
              onClick={onSkip}
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Tidak Sekarang
            </button>
          </>
        )}

        {/* ── Step 3: Breathing Exercise — Inhale ── */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-black text-gray-900 mb-5">Breathing Exercise</h2>
            <div className="flex items-end justify-center gap-4 mb-5">
              {/* Inhale mascot — hands on cheeks */}
              <div className="flex flex-col items-center">
                <img src={mascot} alt="Tarik Nafas" className="w-20 h-20 object-contain opacity-90" />
                <span className="text-[10px] text-gray-400 mt-1">Tarik Nafas</span>
              </div>
              {/* Exhale mascot — mouth open */}
              <div className="flex flex-col items-center">
                <img src={smallMascot} alt="Buang Nafas" className="w-20 h-20 object-contain" />
                <span className="text-[10px] text-gray-400 mt-1">Buang Nafas</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Tarik nafas dalam dan<br />hembuskan perlahan
            </p>
            <button
              onClick={next}
              className="w-full py-4 rounded-2xl bg-[#1B6B45] text-white font-black text-base mb-3 hover:bg-[#145236] transition-all active:scale-[0.98] leading-tight"
            >
              Lakukan sebanyak<br />5x
            </button>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Lanjutkan
            </button>
          </>
        )}

        {/* ── Step 4: Breathing Exercise — Repeat ── */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-black text-gray-900 mb-5">Breathing Exercise</h2>
            <div className="flex items-end justify-center gap-4 mb-5">
              <div className="flex flex-col items-center">
                <img src={mascot} alt="Tarik Nafas" className="w-20 h-20 object-contain" style={{ transform: "scaleX(-1)" }} />
                <span className="text-[10px] text-gray-400 mt-1">Inhale</span>
              </div>
              <div className="flex flex-col items-center">
                <img src={smallMascot} alt="Buang Nafas" className="w-20 h-20 object-contain" />
                <span className="text-[10px] text-gray-400 mt-1">Exhale</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Tarik nafas dalam dan<br />hembuskan perlahan
            </p>
            <button
              onClick={next}
              className="w-full py-4 rounded-2xl bg-[#1B6B45] text-white font-black text-base mb-3 hover:bg-[#145236] transition-all active:scale-[0.98] leading-tight"
            >
              Lakukan sebanyak<br />5x
            </button>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Lanjutkan
            </button>
          </>
        )}

        {/* ── Step 5: Calming Screen ── */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-black text-gray-900 mb-4">Calming Screen</h2>
            {/* Nature image with mascot overlay */}
            <div className="relative w-full h-44 mb-5 rounded-2xl overflow-hidden">
              <img
                src={calmingNature}
                alt="Alam Tenang"
                className="w-full h-full object-cover"
              />
              <img
                src={smallMascot}
                alt="Fico"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 object-contain drop-shadow-lg"
              />
            </div>
            <p className="text-sm text-gray-500 mb-7 leading-relaxed">
              Pikiran yang tenang membantu fokus kembali.<br />
              Tarik napas perlahan dan nikmati jeda ini.
            </p>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Lanjutkan
            </button>
          </>
        )}

        {/* ── Step 6: Water Reminder ── */}
        {step === 6 && (
          <>
            <h2 className="text-xl font-black text-gray-900 mb-6">Water Reminder</h2>
            {/* Mascot + glass of water */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <img src={mascot} alt="Fico" className="w-28 h-28 object-contain" />
              {/* Water glass icon */}
              <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="36" height="48" rx="4" fill="#60A5FA" />
                <rect x="6" y="28" width="36" height="24" rx="4" fill="#3B82F6" />
                <rect x="10" y="8" width="6" height="3" rx="1.5" fill="white" opacity="0.5" />
              </svg>
            </div>
            <p className="text-lg font-black text-gray-900 mb-2">
              Jangan lupa minum air putih ya!
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Tubuh yang terhidrasi membantu otak tetap fokus
            </p>
            <button
              onClick={onFinish}
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Selesai
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PemilihanMood() {
  const [selected, setSelected]         = useState(null);
  const [showStressPopup, setShowStressPopup] = useState(false);

  const navigate        = useNavigate();
  const setMoodStore    = useWellnessStore((s) => s.setMood);
  const { setTodayMood } = useMood();
  const { setPresetByMood } = useTimer();

  /** Simpan mood + set timer preset, lalu navigasi */
  const commitAndNavigate = (moodId) => {
    setMoodStore(moodId);
    setTodayMood(moodId);
    setPresetByMood(moodId);
    localStorage.setItem("mood_selected", "true");
    navigate("/");
  };

  const handleConfirm = () => {
    if (!selected) return;

    if (selected === "stress") {
      // Simpan mood dulu, tapi tahan navigasi — tampilkan stress flow
      setMoodStore(selected);
      setTodayMood(selected);
      setPresetByMood(selected);
      setShowStressPopup(true);
    } else {
      commitAndNavigate(selected);
    }
  };

  const toggle = (id) => setSelected((p) => (p === id ? null : id));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4DD] p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a]">
            Bagaimana perasaanmu sekarang?
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Pilih satu mood yang paling cocok dengan keadaanmu saat ini
          </p>
        </header>

        <main>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {MOODS.map((m) => {
              const active = selected === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggle(m.id)}
                  className={`relative flex flex-col items-center justify-between p-4 h-44 bg-[#FAFAFA] rounded-2xl transition-shadow duration-150 border ${
                    active ? "ring-4 ring-primary bg-white" : "hover:shadow-md"
                  }`}
                >
                  <div className="mt-2">
                    <img src={m.icon} alt={m.label} className="w-20 h-20 object-contain" />
                  </div>
                  <div className={`text-sm font-semibold mt-3 ${active ? "text-primary" : "text-gray-700"}`}>
                    {m.label}
                  </div>

                  {active && (
                    <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-2 shadow border-2 border-white">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="max-w-sm mx-auto mb-4">
            <Button onClick={handleConfirm} disabled={!selected} className="w-full">
              Konfirmasi
            </Button>
          </div>
        </main>
      </div>

      {/* ── Stress Recovery Multi-Step Popup ── */}
      {showStressPopup && (
        <StressPopup
          onFinish={() => {
            localStorage.setItem("mood_selected", "true");
            navigate("/");
          }}
          onSkip={() => {
            localStorage.setItem("mood_selected", "true");
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
