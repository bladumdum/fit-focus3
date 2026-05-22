import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mascotSvg from "../assets/icons/mascot.svg";

// Icons as inline SVG components
function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const settingItems = [
  {
    id: "akun",
    icon: <UserIcon />,
    title: "Akun Anda",
    desc: "Lihat informasi tentang akun anda",
    route: "/pengaturan/akun",
  },
  {
    id: "bahasa",
    icon: <GlobeIcon />,
    title: "Bahasa dan Notifikasi",
    desc: "Atur bahasa dan nada dering yang digunakan dalam aplikasi",
    route: "/pengaturan/bahasa",
  },
];

export default function PengaturanPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = settingItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full px-2 py-6 relative" style={{ minHeight: "100%" }}>
      {/* Page Title */}
      <h1
        className="text-3xl font-bold text-gray-800 mb-6"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        Pengaturan :
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div
          className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 bg-white w-fit"
          style={{ minWidth: "220px" }}
        >
          <span className="text-gray-400">
            <SearchIcon />
          </span>
          <input
            id="pengaturan-search"
            type="text"
            placeholder="Pengaturan Pencarian"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400 w-44"
          />
        </div>
      </div>

      {/* Settings List */}
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {filtered.map((item) => (
          <button
            key={item.id}
            id={`setting-item-${item.id}`}
            onClick={() => navigate(item.route)}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-full px-5 py-4 shadow-sm hover:shadow-md hover:border-[#006A4E] transition-all group w-full text-left"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#e8f5e9] group-hover:text-[#006A4E] transition-colors">
              {item.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col flex-1 min-w-0">
              <span
                className="font-bold text-gray-800 text-sm leading-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {item.title}
              </span>
              <span className="text-xs text-gray-400 mt-0.5 leading-snug">
                {item.desc}
              </span>
            </div>

            {/* Arrow */}
            <span className="text-gray-300 group-hover:text-[#006A4E] transition-colors flex-shrink-0">
              <ChevronRightIcon />
            </span>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-10 text-sm">
            Tidak ada pengaturan yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {/* Mascot + Speech Bubble — bottom left */}
      <div className="absolute bottom-4 left-0 flex items-end gap-0 pointer-events-none select-none">
        {/* Mascot image */}
        <img
          src={mascotSvg}
          alt="Mascot Fico"
          className="w-28 h-28 object-contain"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* Speech Bubble */}
        <div
          className="relative mb-12 ml-2"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {/* Bubble body */}
          <div className="bg-white border border-gray-200 rounded-3xl rounded-bl-none px-4 py-3 shadow-md text-center max-w-[180px]">
            <p className="text-sm font-semibold text-gray-700 leading-snug">
              Psst... ada yang
              <br />
              bisa diubah di sini
            </p>
            <p className="text-base mt-0.5">👀</p>
          </div>

          {/* Bubble tail dots */}
          <div className="flex items-center gap-1 mt-1 ml-2">
            <div className="w-2 h-2 rounded-full bg-white border border-gray-200 shadow-sm" />
            <div className="w-1.5 h-1.5 rounded-full bg-white border border-gray-200 shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
