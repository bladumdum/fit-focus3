import React, { useState } from "react";

// ── Icon helpers ──────────────────────────────────────────────────────────────
function TrendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#006A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function TimerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#006A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" />
      <path d="M9 3h6" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#006A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, trend, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-sm flex flex-col gap-1 relative"
      style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* icon top-right */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center">
        {icon}
      </div>
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-4xl font-black text-gray-800">{value}</span>
        <span className="text-sm font-semibold text-gray-500">{unit}</span>
      </div>
      {trend && (
        <p className="text-xs text-[#006A4E] font-semibold mt-1">
          ↑ {trend}
        </p>
      )}
    </div>
  );
}

// ── Chart helpers ─────────────────────────────────────────────────────────────
// Smooth bezier path from array of [x, y] points
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cpx = (x0 + x1) / 2;
    d += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

// ── Chart data ─────────────────────────────────────────────────────────────────
const PERIOD_DATA = {
  "6 Hari": {
    labels: ["25 Mei", "24 Mei", "23 Mei", "22 Mei", "21 Mei", "20 Mei"],
    series: [
      { name: "5 Jam", color: "#6366f1", data: [5, 5, 5, 5, 5, 5] },
      { name: "4 Jam", color: "#06b6d4", data: [4, 5, 4, 4, 5, 4] },
      { name: "3 Jam", color: "#22c55e", data: [3, 4, 3, 2, 4, 3] },
      { name: "2 Jam", color: "#ec4899", data: [2, 2, 2, 2, 2, 2] },
      { name: "1 Jam", color: "#8b5cf6", data: [3, 3, 3, 5, 3, 1] },
      { name: "0 Jam", color: "#f97316", data: [1, 1, 1, 1, 2, 1] },
    ],
  },
  "14 Hari": {
    labels: ["14 Mei","13 Mei","12 Mei","11 Mei","10 Mei","9 Mei","8 Mei","7 Mei","6 Mei","5 Mei","4 Mei","3 Mei","2 Mei","1 Mei"],
    series: [
      { name: "5 Jam", color: "#6366f1", data: [5,4,5,5,4,5,5,4,5,5,4,5,4,5] },
      { name: "4 Jam", color: "#06b6d4", data: [4,4,5,4,4,4,5,4,4,4,4,4,4,4] },
      { name: "3 Jam", color: "#22c55e", data: [3,3,4,3,2,4,3,3,4,3,2,3,3,4] },
      { name: "2 Jam", color: "#ec4899", data: [2,1,2,2,2,2,2,2,2,2,1,2,2,2] },
      { name: "1 Jam", color: "#8b5cf6", data: [1,2,3,5,3,1,2,3,4,5,3,1,2,3] },
      { name: "0 Jam", color: "#f97316", data: [1,1,1,1,2,1,1,1,1,1,2,1,1,1] },
    ],
  },
  "30 Hari": {
    labels: Array.from({length:10}, (_,i)=>`${30-i*3} Mei`),
    series: [
      { name: "5 Jam", color: "#6366f1", data: Array(10).fill(0).map((_,i)=>4+Math.sin(i)*1) },
      { name: "4 Jam", color: "#06b6d4", data: Array(10).fill(0).map((_,i)=>3+Math.cos(i)*1.2) },
      { name: "3 Jam", color: "#22c55e", data: Array(10).fill(0).map((_,i)=>2+Math.sin(i+1)*1.5) },
      { name: "2 Jam", color: "#ec4899", data: Array(10).fill(0).map((_,i)=>2) },
      { name: "1 Jam", color: "#8b5cf6", data: Array(10).fill(0).map((_,i)=>3+Math.sin(i+2)*2) },
      { name: "0 Jam", color: "#f97316", data: Array(10).fill(0).map((_,i)=>1) },
    ],
  },
};

// ── SVG Line Chart ─────────────────────────────────────────────────────────────
function LineChart({ period }) {
  const { labels, series } = PERIOD_DATA[period];
  const W = 800, H = 260;
  const padL = 32, padR = 20, padT = 20, padB = 50;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = labels.length;
  const maxVal = 6;

  // Map data value → SVG y coordinate
  const toY = (v) => padT + chartH - (v / maxVal) * chartH;
  // Map index → SVG x coordinate
  const toX = (i) => padL + (i / (n - 1)) * chartW;

  // Y-axis grid lines
  const yTicks = [0, 1, 2, 3, 4, 5, 6];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: "visible" }}>
      {/* Grid lines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line
            x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)}
            stroke="#e5e7eb" strokeWidth="1"
          />
          <text x={padL - 6} y={toY(v) + 4} textAnchor="end"
            fontSize="10" fill="#9ca3af">{v}</text>
        </g>
      ))}

      {/* Series paths + dots + labels */}
      {series.map((s) => {
        const pts = s.data.map((v, i) => [toX(i), toY(v)]);
        return (
          <g key={s.name}>
            {/* Smooth line */}
            <path d={smoothPath(pts)} fill="none" stroke={s.color}
              strokeWidth="2" strokeLinejoin="round" />
            {/* Data points + value labels */}
            {pts.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="white" stroke={s.color} strokeWidth="2" />
                <text x={x} y={y - 8} textAnchor="middle"
                  fontSize="9" fill={s.color} fontWeight="600">
                  {Math.round(s.data[i])}
                </text>
              </g>
            ))}
          </g>
        );
      })}

      {/* X-axis date labels */}
      {labels.map((lbl, i) => (
        <text key={i} x={toX(i)} y={H - 8} textAnchor="middle"
          fontSize="10" fill="#6b7280">{lbl}</text>
      ))}
    </svg>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
const PERIODS = ["6 Hari", "14 Hari", "30 Hari"];

export default function Statistics() {
  const [period, setPeriod] = useState("6 Hari");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const legend = PERIOD_DATA[period].series;

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* ── Page header ── */}
      <div className="mb-5">
        <h1 className="text-3xl font-black text-gray-800 tracking-wide">STATISTIK</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Ringkasan aktivitas dan pencapaian kamu
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total sesi"
          value="12"
          unit="sesi"
          trend="12% dari bulan lalu"
          icon={<TrendIcon />}
        />
        <StatCard
          label="Total Durasi"
          value="24"
          unit="jam"
          trend="10% dari bulan lalu"
          icon={<TimerIcon />}
        />
        <StatCard
          label="Total Selesaii"
          value="8"
          unit="tugas"
          icon={<ClipboardIcon />}
        />
      </div>

      {/* ── Focus Chart Card ── */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex-1 flex flex-col min-h-0">
        {/* Card header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-gray-800">Grafik Fokus Harian</h2>

          {/* Period Selector */}
          <div className="relative">
            <button
              id="stats-period-btn"
              onClick={() => setShowPeriodMenu((v) => !v)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#006A4E] text-sm font-bold text-[#006A4E] bg-white hover:bg-[#e8f5e9] transition-colors"
            >
              {period} <ChevronDown />
            </button>
            {showPeriodMenu && (
              <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    id={`stats-period-${p.replace(" ", "-")}`}
                    onClick={() => { setPeriod(p); setShowPeriodMenu(false); }}
                    className={`block w-full text-left px-5 py-2.5 text-sm font-semibold hover:bg-[#e8f5e9] transition-colors
                      ${p === period ? "text-[#006A4E] bg-[#e8f5e9]" : "text-gray-700"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SVG Chart */}
        <div className="flex-1 min-h-0" style={{ minHeight: "200px" }}>
          <LineChart period={period} />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-3">
          {legend.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5">
              <svg width="24" height="8">
                <line x1="0" y1="4" x2="16" y2="4" stroke={s.color} strokeWidth="2" />
                <circle cx="20" cy="4" r="3" fill="white" stroke={s.color} strokeWidth="1.5" />
              </svg>
              <span className="text-xs text-gray-500 font-semibold">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
