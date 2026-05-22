import React, { useEffect, useRef } from "react";
import smallMascot from "../../assets/icons/smallMascot.svg";

/**
 * PomodoroPopUp — Full-screen modal shown when user clicks the PomodoroTimeOut toast.
 *
 * Props:
 *   visible    {boolean}   — controls whether the modal is shown
 *   onClose    {function}  — called when user closes the modal
 *   videoSrc   {string}    — optional: path/URL to relaxation video
 *                            e.g. import relaxVideo from "../../assets/videos/relaksasi_stretching.mp4"
 *                            then pass videoSrc={relaxVideo}
 */
export default function PomodoroPopUp({ visible, onClose, videoSrc }) {
  const videoRef = useRef(null);

  // Auto-play video when modal opens, pause when it closes
  useEffect(() => {
    if (!videoRef.current) return;
    if (visible) {
      videoRef.current.play().catch(() => {}); // ignore autoplay block
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [visible]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    if (visible) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(26, 58, 42, 0.85)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {/* ── Modal Card ── */}
      <div
        className="relative flex flex-col rounded-3xl p-6 w-full max-w-2xl shadow-2xl"
        style={{ backgroundColor: "#F6F4DD", fontFamily: "'Nunito', sans-serif" }}
        role="dialog"
        aria-modal="true"
        aria-label="Waktunya Stretching"
      >
        {/* ── Close button ── */}
        <button
          id="popup-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 transition-colors shadow-sm"
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── Header: mascot + title ── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 flex-shrink-0">
            <img src={smallMascot} alt="Fico" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800 leading-tight">
              Waktunya Stretching!
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Tubuhmu butuh gerakan agar tetap segar dan segar dan fokus
            </p>
          </div>
        </div>

        {/* ── Video area ── */}
        <div
          className="w-full rounded-2xl overflow-hidden flex items-center justify-center mb-5"
          style={{
            backgroundColor: "#1a3a2a",
            aspectRatio: "16 / 9",
            minHeight: "200px",
          }}
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              controls
              loop
              playsInline
            />
          ) : (
            /* Placeholder when no video is provided */
            <div className="flex flex-col items-center gap-3 text-white/50 select-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <p className="text-sm font-semibold">
                Letakkan video di<br />
                <code className="text-xs opacity-70">src/assets/videos/</code>
              </p>
            </div>
          )}
        </div>

        {/* ── Tip banner (bottom) ── */}
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3"
          style={{ backgroundColor: "#95D598" }}
        >
          {/* Tip text + bulb */}
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
            <p className="text-sm font-semibold text-gray-800 leading-snug">
              Lakukan setiap gerakan dengan perlahan<br />
              dan rasakan tubuhmu lebih relaks
            </p>
          </div>

          {/* Mascot on the right */}
          <div className="flex-shrink-0 w-16 h-16 ml-3">
            <img
              src={smallMascot}
              alt=""
              className="w-full h-full object-contain"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
