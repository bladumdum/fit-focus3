import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MascotAndLogo from "../../assets/icons/Mascot_and_Logo.svg";
import mascotSvg from "../../assets/icons/mascot.svg";
import smallMascot from "../../assets/icons/smallMascot.svg";
import { User, Mail, Lock } from "lucide-react";
import Input from "../../components/ui/Input";

// Label with left icon for each field
function FieldLabel({ icon, text }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-gray-700">{icon}</span>
      <span
        className="text-sm font-semibold text-gray-700"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

export default function UserAccount() {
  const navigate = useNavigate();

  // Dummy user data — replace with real auth context/store later
  const [form, setForm] = useState({
    username: "@AlexKiboy",
    email: "@AlexKiboy2130",
    password: "**************",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#F6F4DD", fontFamily: "'Nunito', sans-serif" }}
    >
      {/* ── Header Row ── */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-6">
        {/* Back Button */}
        <button
          id="user-account-back-btn"
          onClick={() => navigate("/pengaturan")}
          className="flex items-center justify-center w-16 h-14 rounded-2xl text-white shadow-md transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: "#006A4E" }}
          aria-label="Kembali"
        >
          {/* Arrow left icon */}
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
            Informasi Akun
          </span>
        </div>
      </div>

      {/* ── Form Section ── */}
      <div className="flex flex-col items-center flex-1 px-8 pt-4 pb-10 relative">
        <div className="w-full max-w-xl flex flex-col gap-5">
          {/* Nama Pengguna */}
          <div>
            <FieldLabel
              icon={<User className="w-5 h-5" />}
              text="Nama Pengguna"
            />
            <Input
              id="input-username"
              name="username"
              type="text"
              iconType="user"
              placeholder="Nama pengguna..."
              value={form.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <FieldLabel
              icon={
                /* Email icon — using an envelope SVG matching the design */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-gray-700"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              }
              text="Email"
            />
            <Input
              id="input-email"
              name="email"
              type="email"
              iconType="email"
              placeholder="Email..."
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <FieldLabel
              icon={<Lock className="w-5 h-5" />}
              text="Password"
            />
            <Input
              id="input-password"
              name="password"
              type="password"
              iconType="password"
              placeholder="Password..."
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Mascot Decorations ── */}

        {/* Bottom-left mascot (large) */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none select-none"
          style={{ width: "180px" }}
        >
          <img
            src={mascotSvg}
            alt=""
            className="w-full h-auto object-contain"
            style={{ transform: "scaleX(1)" }}
          />
        </div>

        {/* Bottom-right mascot (small, partially cropped) */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{ width: "120px", transform: "scaleX(-1)" }}
        >
          <img
            src={smallMascot}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
