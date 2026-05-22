import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MascotAndLogo from "../../assets/icons/Mascot_and_Logo.svg";
import mascotSvg from "../../assets/icons/mascot.svg";

// ── Radio / Selector Pill ─────────────────────────────────────────────────────
function SelectionPill({ label, selected, onClick, id }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-5 py-3.5 rounded-full border text-sm font-semibold
        transition-all duration-200 text-left
        ${
          selected
            ? "bg-white border-gray-200 text-[#006A4E] shadow-sm"
            : "bg-white border-gray-200 text-[#006A4E] hover:shadow-md"
        }
      `}
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Radio circle — only shown when NOT selected */}
      {!selected && (
        <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300" />
      )}
      <span>{label}</span>
    </button>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <h2
      className="text-xl font-bold text-gray-800 mb-3"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {children}
    </h2>
  );
}

// ── Sub-label above pills ─────────────────────────────────────────────────────
function SubLabel({ children }) {
  return (
    <p
      className="text-sm font-semibold text-gray-600 mb-3"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {children}
    </p>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BahasadanNotifPage() {
  const navigate = useNavigate();

  const [bahasa, setBahasa] = useState("indonesia");
  const [nadaDering, setNadaDering] = useState("nada1");

  const bahasaOptions = [
    { value: "indonesia", label: "Indonesia" },
    { value: "english", label: "English" },
  ];

  const nadaDeringOptions = [
    { value: "nada1", label: "Nada dering 1" },
    { value: "nada2", label: "Nada dering 2" },
    { value: "nada3", label: "Nada dering 3" },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#F6F4DD", fontFamily: "'Nunito', sans-serif" }}
    >
      {/* ── Header Row ── */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-6">
        {/* Back Button */}
        <button
          id="bahasa-notif-back-btn"
          onClick={() => navigate("/pengaturan")}
          className="flex items-center justify-center w-16 h-14 rounded-2xl text-white shadow-md transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: "#006A4E" }}
          aria-label="Kembali"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Title Bar */}
        <div
          className="flex-1 flex items-center gap-4 rounded-full px-6 py-3 shadow-md"
          style={{ backgroundColor: "#006A4E" }}
        >
          <img
            src={MascotAndLogo}
            alt="Fit-Focus Mascot"
            className="w-10 h-10 object-contain"
          />
          <span className="text-white text-xl font-bold tracking-wide">
            Bahasa dan Notifikasi
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col px-8 pt-2 pb-10 relative flex-1">
        <div className="w-full max-w-xl ml-auto mr-auto flex flex-col gap-8">

          {/* ── Bahasa Section ── */}
          <div>
            <SectionTitle>Bahasa</SectionTitle>
            <SubLabel>Pilih Bahasa :</SubLabel>
            <div className="flex flex-col gap-3">
              {bahasaOptions.map((opt) => (
                <SelectionPill
                  key={opt.value}
                  id={`bahasa-option-${opt.value}`}
                  label={opt.label}
                  selected={bahasa === opt.value}
                  onClick={() => setBahasa(opt.value)}
                />
              ))}
            </div>
          </div>

          {/* ── Notifikasi Section ── */}
          <div>
            <SectionTitle>Notifikasi</SectionTitle>
            <SubLabel>Pilih Nada Dering :</SubLabel>
            <div className="flex flex-col gap-3">
              {nadaDeringOptions.map((opt) => (
                <SelectionPill
                  key={opt.value}
                  id={`nada-option-${opt.value}`}
                  label={opt.label}
                  selected={nadaDering === opt.value}
                  onClick={() => setNadaDering(opt.value)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom-left Mascot Decoration ── */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none select-none"
          style={{ width: "160px" }}
        >
          <img
            src={mascotSvg}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
