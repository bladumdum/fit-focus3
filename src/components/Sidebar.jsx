import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MascotAndLogo from "../assets/icons/Mascot_and_Logo.svg";
import smallMascot from "../assets/icons/smallMascot.svg";

function LogOutIcon() {
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
      strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function PengaturanIcon() {
  return (
    <img
      src={smallMascot}
      alt="Pengaturan"
      className="w-5 h-5 object-contain"
    />
  );
}

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/asisten", label: "Asisten Fico!" },
  { to: "/riwayat", label: "Riwayat" },
  { to: "/statistik", label: "Statistik" },
  { to: "/pengaturan", label: "Pengaturan", icon: <PengaturanIcon /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  // FIX 1: Added the missing closing brace and semicolon
  const handleLogout = () => {
    localStorage.clear();

    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="w-64 bg-[#006A4E] text-white p-5 flex flex-col justify-between shadow-xl"
      style={{
        minHeight: "calc(100vh - 4rem)",
        position: "sticky",
        top: "2rem",
      }}>
      {/* ── Top: Logo + Nav ── */}
      <div className="flex flex-col gap-7">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 px-1 pt-1">
          <img
            src={MascotAndLogo}
            alt="Fit-Focus Logo"
            className="w-10 h-10 object-contain"
          />
          <span
            className="text-2xl font-bold tracking-wide text-white"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Fit-Focus
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-3">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 py-2.5 px-5 rounded-full border-2 font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#FEF08A] text-[#006A4E] border-[#FEF08A] shadow-md"
                    : "bg-white text-[#1E4620] border-white hover:bg-gray-50 hover:shadow-sm"
                }`
              }>
              {({ isActive }) => (
                <>
                  {icon && (
                    <span className={isActive ? "opacity-100" : "opacity-70"}>
                      {icon}
                    </span>
                  )}
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ── Bottom: Mascot + Logout ── */}
      <div className="flex flex-col items-center gap-3 mt-4 relative">
        {/* Speech Bubble */}
        <div
          className="relative self-end mr-2"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          <div className="bg-white text-gray-700 text-xs font-medium px-3 py-2 rounded-2xl rounded-br-none shadow-md leading-snug max-w-[145px] text-center">
            Aku siap nemenin fokus kamu hari ini!
          </div>
        </div>

        {/* Mascot */}
        <div className="w-20 h-20 flex items-center justify-center">
          <img
            src={smallMascot}
            alt="Mascot Fico"
            className="w-full h-full object-contain drop-shadow-md"
            style={{ animation: "float 3s ease-in-out infinite" }}
          />
        </div>

        {/* Logout Button */}
        <button
          id="sidebar-logout-btn"
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/80 hover:text-white font-medium self-start px-3 py-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-sm">
          <LogOutIcon />
          <span>Log Out</span>
        </button>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </aside>
  );
}
