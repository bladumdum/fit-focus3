import React, { useEffect, useState } from "react";
import smallMascot from "../../assets/icons/smallMascot.svg";

/**
 * PomodoroTimeOut — Toast notification shown when Pomodoro timer reaches zero.
 *
 * Props:
 *   visible  {boolean}   — controls whether the toast is shown
 *   onClose  {function}  — called when the user dismisses or after auto-dismiss
 */
export default function PomodoroTimeOut({ visible, onClose, onOpenPopup }) {
    const [show, setShow] = useState(false);

    // Animate in/out when `visible` changes
    useEffect(() => {
        if (visible) {
            setShow(true);
            // Auto-dismiss after 8 seconds
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(() => onClose?.(), 400); // wait for slide-out animation
            }, 8000);
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [visible]);

    return (
        <>
            {/* Toast container — fixed bottom-right */}
            <div
                aria-live="polite"
                className={`
          fixed bottom-6 right-6 z-50
          transition-all duration-400 ease-in-out
          ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}
        `}
                style={{ maxWidth: "380px", width: "90vw" }}
            >
                {/* Sparkle decoration top-right */}
                <div className="absolute -top-4 -right-4 pointer-events-none select-none">
                    <SparkleIcon />
                </div>

                {/* Card — clickable to open popup */}
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        setShow(false);
                        setTimeout(() => {
                            onClose?.();
                            onOpenPopup?.();
                        }, 300);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && onOpenPopup?.()}
                    className="relative flex items-center gap-4 rounded-2xl px-5 py-4 shadow-2xl cursor-pointer hover:brightness-[0.97] transition-all"
                    style={{ backgroundColor: "#F6F4DD", border: "1px solid #e0ddc0" }}
                >
                    {/* Timestamp */}
                    <span
                        className="absolute top-3 right-5 text-xs text-gray-400"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                        sekarang
                    </span>

                    {/* Mascot */}
                    <div className="flex-shrink-0 w-16 h-16">
                        <img
                            src={smallMascot}
                            alt="Fico Mascot"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-1 pr-10" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        <p className="text-base font-black text-gray-800 flex items-center gap-1.5 leading-tight">
                            Waktunya Streaching!
                            <span className="text-yellow-400">✦</span>
                        </p>
                        <p className="text-sm text-gray-600 leading-snug">
                            Tubuhmu butuh gerakan agar tetap segar dan segar dan fokus
                        </p>
                    </div>

                    {/* Close button */}
                    <button
                        id="pomodoro-timeout-close"
                        onClick={() => {
                            setShow(false);
                            setTimeout(() => onClose?.(), 400);
                        }}
                        className="absolute top-3 left-3 w-5 h-5 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 transition-colors"
                        aria-label="Tutup notifikasi"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Slide animation style */}
            <style>{`
        .duration-400 { transition-duration: 400ms; }
      `}</style>
        </>
    );
}

// ── Sparkle decoration (matches design) ──────────────────────────────────────
function SparkleIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main sparkle */}
            <path d="M20 4 L22 16 L34 18 L22 20 L20 32 L18 20 L6 18 L18 16 Z"
                fill="#FDE047" stroke="#ca8a04" strokeWidth="0.5" />
            {/* Small sparkle top-left */}
            <path d="M8 6 L9 10 L13 11 L9 12 L8 16 L7 12 L3 11 L7 10 Z"
                fill="#FDE047" stroke="#ca8a04" strokeWidth="0.5" />
        </svg>
    );
}
