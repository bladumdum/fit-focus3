import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const TimerContext = createContext(null);

export const PRESETS = [
  { id: "pomodoro", label: "Pomodoro", minutes: 25 },
  { id: "short",    label: "Short Break", minutes: 5 },
  { id: "long",     label: "Long Break", minutes: 15 },
];

export function TimerProvider({ children }) {
  const [preset, setPreset]           = useState(PRESETS[0]);
  const [running, setRunning]         = useState(false);
  const [remaining, setRemaining]     = useState(PRESETS[0].minutes * 60);
  const [showTimeout, setShowTimeout] = useState(false);
  const [showPopup, setShowPopup]     = useState(false);
  const intervalRef                   = useRef(null);

  // Reset when preset changes
  useEffect(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(preset.minutes * 60);
  }, [preset]);

  // Countdown tick
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setShowTimeout(true); // 🔔 trigger toast
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStartPause = useCallback(() => setRunning((r) => !r), []);

  const handleReset = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(preset.minutes * 60);
  }, [preset]);

  // 🧪 Test button — completes the timer immediately
  const handleFinishNow = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(0);
    setShowTimeout(true);
  }, []);

  const total    = preset.minutes * 60;
  const progress = 1 - remaining / total; // 0 → 1
  const nextBreakMin = Math.ceil(remaining / 60);

  const value = {
    preset, setPreset,
    running, setRunning,
    remaining, setRemaining,
    showTimeout, setShowTimeout,
    showPopup, setShowPopup,
    handleStartPause, handleReset, handleFinishNow,
    progress, nextBreakMin,
    PRESETS
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}

export default TimerContext;
