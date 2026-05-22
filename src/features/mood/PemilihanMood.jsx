import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Check } from "lucide-react";
import semangat from "../../assets/icons/Semangat Emot.svg";
import biasa from "../../assets/icons/Biasa Aja Emot.svg";
import lelah from "../../assets/icons/Lelah Emot.svg";
import stress from "../../assets/icons/Stress Emot.svg";

const MOODS = [
  { id: "semangat", label: "Semangat", icon: semangat },
  { id: "biasa", label: "Biasa Aja", icon: biasa },
  { id: "lelah", label: "Lelah", icon: lelah },
  { id: "stress", label: "Stress", icon: stress },
];

export default function PemilihanMood() {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (id) => {
    setConfirmed(false);
    setSelected((p) => (p === id ? null : id));
  };

  const handleConfirm = () => {
    if (!selected) return;
    // TODO: wire to store/context
    console.log("Selected mood:", selected);
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4DD] p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a]">Bagaimana perasaanmu sekarang?</h1>
          <p className="text-sm text-gray-600 mt-1">Pilih satu mood yang paling cocok dengan keadaanmu saat ini</p>
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
                  <div className={`text-sm font-semibold mt-3 ${active ? "text-primary" : "text-gray-700"}`}>{m.label}</div>

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
            <Button onClick={handleConfirm} disabled={!selected} className="w-full">Konfirmasi</Button>
          </div>

          {confirmed && <div className="text-sm text-primary text-center">Terima kasih — mood berhasil disimpan.</div>}
        </main>
      </div>
    </div>
  );
}
