import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import smallMascot from "../../assets/icons/smallMascot.svg";
import Relaksasi from "../../assets/videos/Relaksasi.mp4";
import { useTimer } from "../../contexts/TimerContext";
import { useMood } from "../../contexts/MoodContext";

/**
 * PomodoroPopUp — Modal stretching setelah sesi Pomodoro selesai.
 *
 * Props:
 *   visible  {boolean}   — tampil atau tidak
 *   onClose  {function}  — dipanggil saat modal ditutup
 */
export default function PomodoroPopUp({ visible, onClose }) {
  const videoRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { setPresetByMood, setRemaining, setRunning, setShowPopup } = useTimer();
  const { mood } = useMood();

  // Auto-play video saat modal terbuka, pause saat ditutup
  useEffect(() => {
    if (!videoRef.current) return;
    if (visible) {
      setShowConfirm(false);
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setShowConfirm(false);
    }
  }, [visible]);

  // Tampilkan popup konfirmasi saat video selesai
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setShowConfirm(true);
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // Tutup dengan Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (visible) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible]);

  const handleClose = () => {
    onClose?.();
    setShowPopup(false);
  };

  // Tombol "Ya" → set timer berdasarkan mood, arahkan ke dashboard
  const handleYa = () => {
    const moodId = mood?.today ?? "semangat";
    setPresetByMood(moodId);
    setRunning(false);
    handleClose();
    navigate("/");
  };

  // Tombol "Tidak" → set timer ke 0, arahkan ke dashboard
  const handleTidak = () => {
    setRunning(false);
    setRemaining(0);
    handleClose();
    navigate("/");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ backgroundColor: "#2A4134" }}
    >
      {/* ── Modal Card ── */}
      <div
        className="relative flex flex-col rounded-[32px] p-8 w-full max-w-4xl"
        style={{
          backgroundColor: "#F3F5DF",
          boxShadow: "0 0 80px 15px rgba(255,255,255,0.25)",
          fontFamily: "'Nunito', sans-serif",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Waktunya Stretching"
      >
        {/* ── Header: mascot + judul ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 flex-shrink-0">
            <img src={smallMascot} alt="Fico" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2
              className="text-2xl font-extrabold leading-tight"
              style={{ color: "#1E3A2F" }}
            >
              Waktunya Stretching!
            </h2>
            <p className="text-sm font-medium mt-0.5" style={{ color: "#4A6358" }}>
              Tubuhmu butuh gerakan agar tetap segar dan fokus
            </p>
          </div>
        </div>

        {/* ── Video area (dengan popup konfirmasi di tengah) ── */}
        <div
          className="relative w-full rounded-[24px] overflow-hidden mb-6"
          style={{ backgroundColor: "#1E3A2F" }}
        >
          <video
            ref={videoRef}
            src={Relaksasi}
            className="w-full h-auto block"
            controls
            loop={false}
            playsInline
          />

          {/* ── Popup konfirmasi "Mau Lanjut Aktivitas?" ── */}
          {showConfirm && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(30,58,47,0.55)", backdropFilter: "blur(2px)" }}
            >
              <div
                className="flex flex-col items-center gap-4 rounded-2xl px-10 py-6 shadow-xl"
                style={{
                  backgroundColor: "#F3F5DF",
                  fontFamily: "'Nunito', sans-serif",
                  minWidth: "220px",
                }}
              >
                <p
                  className="text-base font-bold text-center"
                  style={{ color: "#1E3A2F" }}
                >
                  Mau Lanjut Aktivitas?
                </p>
                <div className="flex gap-4">
                  {/* Tombol Ya */}
                  <button
                    id="confirm-ya-btn"
                    onClick={handleYa}
                    className="px-6 py-1.5 rounded-full border-2 font-semibold text-sm transition-all hover:opacity-80 active:scale-95"
                    style={{
                      borderColor: "#9B8EC4",
                      color: "#6B5EA8",
                      backgroundColor: "transparent",
                    }}
                  >
                    Ya
                  </button>

                  {/* Tombol Tidak */}
                  <button
                    id="confirm-tidak-btn"
                    onClick={handleTidak}
                    className="px-6 py-1.5 rounded-full border-2 font-semibold text-sm transition-all hover:opacity-80 active:scale-95"
                    style={{
                      borderColor: "#9B8EC4",
                      color: "#6B5EA8",
                      backgroundColor: "transparent",
                    }}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Tip banner bawah ── */}
        <div className="relative w-full flex items-stretch">
          <div
            className="flex items-center rounded-2xl px-6 py-4 flex-1 mr-20"
            style={{ backgroundColor: "#99D49D" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: "#1E3A2F" }}
              >
                Lakukan setiap gerakan dengan perlahan<br />
                dan rasakan tubuhmu lebih relaks
              </p>
            </div>
          </div>

          {/* Maskot kanan bawah */}
          <div className="absolute right-2 -bottom-2 w-24 h-24 z-10 pointer-events-none">
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-2 rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
            />
            <img
              src={smallMascot}
              alt=""
              className="relative w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}