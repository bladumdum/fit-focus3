import React, { useState } from "react";
import smallMascot from "../../assets/icons/smallMascot.svg";

// ── Helpers ───────────────────────────────────────────────────────────────────
const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatDate(date) {
  return `${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function TimerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
      fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" />
      <path d="M9 3h6" />
    </svg>
  );
}
function GlassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
      fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3l-1 13h10L16 3H8z" />
      <path d="M7 16c0 2.8 2 5 5 5s5-2.2 5-5" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
      fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

// ── Activity timeline data ────────────────────────────────────────────────────
const ALL_ACTIVITIES = [
  { time: "09.00", title: "Focus Session", sub: "Pomodoro 25", detail: "25 Menit", done: false },
  { time: "09.00", title: "To-do Today",   sub: "Menambah 1 tugas",   detail: "2 Task",   done: true },
  { time: "10.00", title: "Drink Water",   sub: "Minum 1 Gelas Air",  detail: "1 Gelas",  done: true },
  { time: "11.00", title: "Focus Session", sub: "Pomodoro 25",        detail: "25 Menit", done: true },
  { time: "13.00", title: "To-do Today",   sub: "Menambah 1 Tugas",   detail: "1 Task",   done: true },
  { time: "14.00", title: "Drink Water",   sub: "Minum 1 Gelas",      detail: "1 Gelas",  done: true },
  { time: "15.00", title: "Mood",          sub: "Mood Pengguna Hari Ini", detail: "Semangat", done: true },
  { time: "16.00", title: "Focus Session", sub: "Pomodoro 25",        detail: "25 Menit", done: true },
  { time: "17.00", title: "Drink Water",   sub: "Minum 1 Gelas",      detail: "1 Gelas",  done: true },
];

const PAGE_SIZE = 7;

// ── ActivityItem ──────────────────────────────────────────────────────────────
function ActivityItem({ time, title, sub, detail, done }) {
  return (
    <div className="flex items-center gap-3 relative">
      {/* Time */}
      <span className="w-10 text-xs text-gray-400 font-medium flex-shrink-0 text-right">
        {time}
      </span>

      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white z-10" />
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800 leading-tight truncate"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            {title}
          </p>
          <p className="text-xs text-gray-400 truncate">{sub}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <span className="text-xs font-semibold text-gray-500">{detail}</span>
          {done ? (
            <span className="w-6 h-6 rounded-full bg-[#006A4E] flex items-center justify-center text-white flex-shrink-0">
              <CheckIcon />
            </span>
          ) : (
            <span className="w-6 h-6 rounded-full bg-[#FEF08A] flex-shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
}

// ── SummaryCard ───────────────────────────────────────────────────────────────
function SummaryCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-base font-bold text-gray-800"
          style={{ fontFamily: "'Nunito', sans-serif" }}>{value}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
      <div className="flex-shrink-0 ml-3 opacity-70">{icon}</div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function History() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 22)); // 22 Mei 2026
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const prevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
    setVisibleCount(PAGE_SIZE);
  };
  const nextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
    setVisibleCount(PAGE_SIZE);
  };

  const shown = ALL_ACTIVITIES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_ACTIVITIES.length;

  return (
    <div
      className="flex gap-5 h-full"
      style={{ fontFamily: "'Nunito', sans-serif", minHeight: "calc(100vh - 4rem)" }}
    >
      {/* ══ MIDDLE PANEL ══════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Pengguna :</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Lihat riwayat aktivitas produktivitas dan kesehatanmu.
          </p>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center gap-2 mb-5">
          <button
            id="history-prev-day"
            onClick={prevDay}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft />
          </button>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-semibold text-gray-700">
            <CalendarIcon />
            <span>{formatDate(currentDate)}</span>
          </div>

          <button
            id="history-next-day"
            onClick={nextDay}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Activity Card */}
        <div className="bg-[#f5f8f5] border border-gray-200 rounded-3xl p-5 flex flex-col gap-1 flex-1">
          <h2 className="text-base font-bold text-gray-700 mb-3">Riwayat Aktivitas</h2>

          {/* Timeline */}
          <div className="relative flex flex-col gap-3">
            {/* Vertical line */}
            <div
              className="absolute left-[54px] top-0 bottom-0 w-px bg-gray-200"
              style={{ zIndex: 0 }}
            />

            {shown.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <button
              id="history-load-more"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="mx-auto mt-4 flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
            >
              Muat Lebih Banyak <ChevronDown />
            </button>
          )}

          {!hasMore && shown.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Semua aktivitas sudah ditampilkan.
            </p>
          )}
        </div>
      </div>

      {/* ══ RIGHT PANEL — Ringkasan Hari Ini ══════════════════════════════════ */}
      <div
        className="w-56 flex-shrink-0 rounded-3xl p-4 flex flex-col gap-3"
        style={{ backgroundColor: "#95D598" }}
      >
        <h2 className="text-base font-bold text-gray-800 mb-1">Ringkasan Hari Ini</h2>

        <SummaryCard
          label="Total Focus Session"
          value="2 jam 45 menit"
          sub="Total Focus Session"
          icon={<TimerIcon />}
        />

        <SummaryCard
          label="Total Hidrasi"
          value="4 / 8 Gelas"
          sub="50% dari target harian"
          icon={<GlassIcon />}
        />

        <SummaryCard
          label="Tugas hari ini"
          value="2 Task"
          sub="Selesai"
          icon={<ClipboardIcon />}
        />

        <SummaryCard
          label="Mood Hari Ini"
          value="Semangat"
          sub="Pertahankan!"
          icon={
            <img
              src={smallMascot}
              alt="Mood mascot"
              className="w-10 h-10 object-contain"
            />
          }
        />
      </div>
    </div>
  );
}
