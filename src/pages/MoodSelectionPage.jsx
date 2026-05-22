import { useState } from "react";
import { Check } from "lucide-react";
import Button from "../components/ui/Button";

const MOODS = [
  { id: "happy", label: "Senang", emoji: "😊" },
  { id: "calm", label: "Tenang", emoji: "😌" },
  { id: "neutral", label: "Biasa", emoji: "😐" },
  { id: "sad", label: "Sedih", emoji: "😔" },
  { id: "anxious", label: "Cemas", emoji: "😰" },
  { id: "excited", label: "Bersemangat", emoji: "🤩" },
];

export default function MoodSelectionPage() {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const toggleSelect = (id) => {
    setConfirmed(false);
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleConfirm = () => {
    if (!selected) return;
    // In a real app: update context/store and navigate.
    console.log("Mood selected:", selected);
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9fafb] p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Pilih Mood Kamu</h1>
          <p className="text-sm text-gray-600 mt-1">
            Pilih perasaan yang paling mendekati kondisimu saat ini. Ini akan membantu
            Fit Focus menyesuaikan rekomendasi.
          </p>
        </header>

        <main>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {MOODS.map((mood) => {
              const active = selected === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => toggleSelect(mood.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSelect(mood.id);
                    }
                  }}
                  aria-pressed={active}
                  className={`relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007953] hover:shadow-md h-36 select-none ${
                    active
                      ? "border-2 border-[#007953] scale-[1.02]"
                      : "border border-transparent"
                  }`}
                >
                  <div className="text-3xl mb-3" aria-hidden>
                    {mood.emoji}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{mood.label}</div>

                  {active && (
                    <span className="absolute -top-3 -right-3 bg-[#007953] text-white rounded-full p-1.5 shadow-md">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-full max-w-xs">
              <Button onClick={handleConfirm} disabled={!selected}>
                Konfirmasi Mood
              </Button>
            </div>

            {confirmed && (
              <div className="text-sm text-green-600 font-medium">Terima kasih — mood disimpan.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
