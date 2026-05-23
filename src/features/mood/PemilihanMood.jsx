import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Check } from "lucide-react";
import semangat from "../../assets/icons/Semangat Emot.svg";
import biasa from "../../assets/icons/Biasa Aja Emot.svg";
import lelah from "../../assets/icons/Lelah Emot.svg";
import stress from "../../assets/icons/Stress Emot.svg";
import { useNavigate } from "react-router-dom";
import useWellnessStore from "../../store/useWellnessStore";
import { useMood } from "../../contexts/MoodContext";
import { useTimer } from "../../contexts/TimerContext";

// Mascots & Images for Modals
import MascotStress from "../../assets/icons/Mascot and Logo (3).svg";
import MascotBreathe1 from "../../assets/icons/Mascot and Logo (4).svg";
import MascotBreathe2 from "../../assets/icons/Mascot and Logo (5).svg";
import MascotCalm from "../../assets/icons/Mascot_and_Logo.svg";
import MountainImg from "../../assets/icons/05c19052b53ae8a04ee857b82033fdd2b356c53e.jpg";
import MascotWater from "../../assets/icons/Mascot and Logo (7).svg";

const MOODS = [
  { id: "semangat", label: "Semangat", icon: semangat },
  { id: "biasa", label: "Biasa Aja", icon: biasa },
  { id: "lelah", label: "Lelah", icon: lelah },
  { id: "stress", label: "Stress", icon: stress },
];

export default function PemilihanMood() {
  const [selected, setSelected] = useState(null);
  const [stressStep, setStressStep] = useState(0); // 0 = None, 1 = Prompt, 2 = Breathing, 3 = Calming

  const navigate = useNavigate();
  const setMoodStore = useWellnessStore((s) => s.setMood);
  const { setTodayMood } = useMood();
  const { setPresetByMood } = useTimer();

  const handleConfirm = () => {
    if (!selected) return;

    if (selected === "stress" && stressStep === 0) {
      setStressStep(1);
      return;
    }

    finishConfirm();
  };

  const finishConfirm = () => {
    setMoodStore(selected);
    setTodayMood(selected);
    setPresetByMood(selected);
    localStorage.setItem("mood_selected", "true");
    navigate("/");
  };

  const toggle = (id) => setSelected((p) => (p === id ? null : id));

  // UI Components for the Stress Modals
  const renderStressModal = () => {
    if (stressStep === 0) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: "#F6F4DD" }}>
        <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-xl flex flex-col items-center text-center">

          {/* STEP 1: PROMPT */}
          {stressStep === 1 && (
            <>
              <img src={MascotStress} alt="Stress" className="w-24 h-24 mb-6 object-contain" />
              <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                Sepertinya kamu sedang<br />mengalami stress
              </h2>
              <p className="text-sm font-medium text-gray-700 mb-8">
                Yuk, ambil waktu sejenak untuk<br />wellness recovery
              </p>
              <div className="w-full flex flex-col gap-3 px-2">
                <button
                  onClick={() => setStressStep(2)}
                  className="w-full py-3 rounded-xl bg-[#027A48] text-white font-semibold shadow-sm hover:bg-[#02663b] transition-colors"
                >
                  Istirahat Dulu
                </button>
                <button
                  onClick={finishConfirm}
                  className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Nanti Saja
                </button>
              </div>
            </>
          )}

          {/* STEP 2: BREATHING */}
          {stressStep === 2 && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Breathing Exercise
              </h2>
              <div className="flex items-end justify-center gap-4 mb-6">
                <img src={MascotBreathe1} alt="Breathe In" className="w-24 h-24 object-contain" />
                <img src={MascotBreathe2} alt="Breathe Out" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-8">
                Tarik nafas dalam dan<br />hembuskan perlahan
              </p>
              <div className="w-full flex flex-col gap-3 px-2">
                <div className="w-full py-2.5 rounded-xl bg-[#027A48] text-white flex flex-col items-center justify-center shadow-sm">
                  <span className="font-semibold">Lakukan sebanyak</span>
                  <span className="font-bold">5x</span>
                </div>
                <button
                  onClick={() => setStressStep(3)}
                  className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Lanjutkan
                </button>
              </div>
            </>
          )}

          {/* STEP 3: CALMING */}
          {stressStep === 3 && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Calming Screen
              </h2>
              <div className="relative mb-10 mt-2 flex justify-center">
                <div className="w-48 h-48 overflow-hidden rounded-xl">
                  <img src={MountainImg} alt="Mountain" className="w-full h-full object-cover" />
                </div>
                <img
                  src={MascotCalm}
                  alt="Calm Mascot"
                  className="w-24 h-24 absolute -bottom-10 object-contain drop-shadow-md"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-8 mt-4">
                Pikiran yang tenang membantu fokus kembali.<br />
                Tarik napas perlahan dan nikmati jeda ini.
              </p>
              <div className="w-full px-2">
                <button
                  onClick={() => setStressStep(4)}
                  className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Lanjutkan
                </button>
              </div>
            </>
          )}

          {/* STEP 4: WATER REMINDER */}
          {stressStep === 4 && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6 mt-2">
                Water Reminder
              </h2>
              <img src={MascotWater} alt="Water Reminder" className="w-32 h-32 mb-8 object-contain drop-shadow-sm" />
              <p className="text-lg font-medium text-gray-900 mb-3 px-2">
                Jangan lupa minum air putih ya!
              </p>
              <p className="text-sm font-medium text-gray-700 mb-10 px-2">
                Tubuh yang terhidrasi membantu otak tetap fokus
              </p>
              <div className="w-full px-2">
                <button
                  onClick={finishConfirm}
                  className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Selesai
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4DD] p-6 relative overflow-hidden">
      {renderStressModal()}

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 relative z-10">
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
                  className={`relative flex flex-col items-center justify-between p-4 h-44 bg-[#FAFAFA] rounded-2xl transition-shadow duration-150 border ${active ? "ring-4 ring-primary bg-white" : "hover:shadow-md"
                    }`}>
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
