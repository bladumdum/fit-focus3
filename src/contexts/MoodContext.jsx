import React, { createContext, useContext, useState, useCallback } from "react";

const MoodContext = createContext(null);

export const MOOD_OPTIONS = [
  { id: "semangat", label: "Semangat", emoji: "😄" },
  { id: "biasa",    label: "Biasa Aja", emoji: "😐" },
  { id: "lelah",    label: "Lelah",     emoji: "😴" },
  { id: "stress",   label: "Stress",    emoji: "😤" },
];

export function MoodProvider({ children }) {
  const [mood, setMood] = useState({
    today: null, // one of MOOD_OPTIONS.id or null
    history: [], // [{ date: string, mood: string }]
  });

  const setTodayMood = useCallback((moodId) => {
    const today = new Date().toISOString().split("T")[0];
    setMood((prev) => ({
      today: moodId,
      history: [
        { date: today, mood: moodId },
        ...prev.history.filter((h) => h.date !== today),
      ],
    }));
  }, []);

  return (
    <MoodContext.Provider value={{ mood, setTodayMood, MOOD_OPTIONS }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}

export default MoodContext;
