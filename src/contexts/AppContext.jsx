/**
 * AppContext.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Central application state. Provides a single <AppProvider> that wraps the
 * entire app and exposes all shared state via the `useApp()` hook.
 *
 * Domains managed:
 *   • user        — profile info (name, avatar)
 *   • timer       — Pomodoro countdown (preset, running, remaining, sessions)
 *   • hydration   — daily water intake (glasses / ml)
 *   • todo        — task list (add, toggle, remove)
 *   • mood        — today's mood entry
 *   • settings    — language & notification sound preference
 *   • activity    — recent activity log (written by timer/hydration/todo/mood)
 *   • ui          — transient UI state (showTimeout toast, showPopup modal)
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Context creation
// ─────────────────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

// ─────────────────────────────────────────────────────────────────────────────
// 2. Constants
// ─────────────────────────────────────────────────────────────────────────────
export const TIMER_PRESETS = [
  { id: "pomodoro", label: "Pomodoro",    minutes: 25 },
  { id: "short",    label: "Short Break", minutes: 5  },
  { id: "long",     label: "Long Break",  minutes: 15 },
];

export const HYDRATION_GOAL_GLASSES = 8; // glasses per day
export const HYDRATION_GOAL_ML      = 2000; // ml per day

export const MOOD_OPTIONS = [
  { id: "semangat", label: "Semangat",  emoji: "😄" },
  { id: "biasaaja", label: "Biasa Aja", emoji: "😐" },
  { id: "lelah",    label: "Lelah",     emoji: "😴" },
  { id: "stress",   label: "Stress",    emoji: "😤" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. Provider
// ─────────────────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {

  // ── User ──────────────────────────────────────────────────────────────────
  const [user, setUser] = useState({
    name:     "Alex",
    username: "@AlexKiboy",
    email:    "@AlexKiboy2130",
    avatar:   null, // path to avatar image or null for mascot fallback
  });

  const updateUser = useCallback((fields) => {
    setUser((prev) => ({ ...prev, ...fields }));
  }, []);

  // ── Settings ──────────────────────────────────────────────────────────────
  const [settings, setSettings] = useState({
    bahasa:     "indonesia", // "indonesia" | "english"
    nadaDering: "nada1",     // "nada1" | "nada2" | "nada3"
  });

  const updateSettings = useCallback((fields) => {
    setSettings((prev) => ({ ...prev, ...fields }));
  }, []);

  // ── Mood ──────────────────────────────────────────────────────────────────
  const [mood, setMood] = useState({
    today:   null, // one of MOOD_OPTIONS.id or null
    history: [],   // [{ date: string, mood: string }]
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
    logActivity({ type: "mood", title: "Mood", sub: "Mood Pengguna Hari Ini", detail: MOOD_OPTIONS.find(m => m.id === moodId)?.label ?? moodId });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hydration ─────────────────────────────────────────────────────────────
  const [hydration, setHydration] = useState({
    glasses: 4,               // current glasses drunk today
    goal:    HYDRATION_GOAL_GLASSES,
    mlDrank: 750,             // ml
    mlGoal:  HYDRATION_GOAL_ML,
  });

  const addGlass = useCallback(() => {
    setHydration((prev) => {
      if (prev.glasses >= prev.goal) return prev;
      logActivity({ type: "water", title: "Drink Water", sub: "Minum 1 Gelas Air", detail: "1 Gelas" });
      return {
        ...prev,
        glasses: prev.glasses + 1,
        mlDrank: prev.mlDrank + Math.round(prev.mlGoal / prev.goal),
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const removeGlass = useCallback(() => {
    setHydration((prev) => ({
      ...prev,
      glasses: Math.max(0, prev.glasses - 1),
      mlDrank: Math.max(0, prev.mlDrank - Math.round(prev.mlGoal / prev.goal)),
    }));
  }, []);

  // ── Todo ──────────────────────────────────────────────────────────────────
  const [todos, setTodos] = useState([
    { id: 1, title: "Tugas Projek UAS",   done: false },
    { id: 2, title: "Projek SKS pak Oni", done: false },
  ]);

  const addTodo = useCallback((title) => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title: title.trim(), done: false };
    setTodos((prev) => [newTask, ...prev]);
    logActivity({ type: "todo", title: "To-do Today", sub: "Menambah 1 tugas", detail: `${todos.length + 1} Task` });
  }, [todos.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearDoneTodos = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.done));
  }, []);

  // ── Pomodoro Timer ────────────────────────────────────────────────────────
  const [timerPreset, setTimerPreset] = useState(TIMER_PRESETS[0]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(TIMER_PRESETS[0].minutes * 60);
  const [timerSessions, setTimerSessions] = useState(0); // completed pomodoro sessions today
  const intervalRef = useRef(null);

  // Reset when preset changes
  useEffect(() => {
    clearInterval(intervalRef.current);
    setTimerRunning(false);
    setTimerRemaining(timerPreset.minutes * 60);
  }, [timerPreset]);

  // Countdown tick
  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setTimerRunning(false);
            // Count sessions only for Pomodoro (not breaks)
            if (timerPreset.id === "pomodoro") {
              setTimerSessions((s) => s + 1);
              logActivity({
                type:   "focus",
                title:  "Focus Session",
                sub:    "Pomodoro 25",
                detail: `${timerPreset.minutes} Menit`,
              });
            }
            setUi((prev) => ({ ...prev, showTimeout: true }));
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerRunning, timerPreset]); // eslint-disable-line react-hooks/exhaustive-deps

  const startPauseTimer = useCallback(() => setTimerRunning((r) => !r), []);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimerRunning(false);
    setTimerRemaining(timerPreset.minutes * 60);
  }, [timerPreset]);

  /** For testing — instantly completes the timer */
  const finishTimerNow = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimerRunning(false);
    setTimerRemaining(0);
    if (timerPreset.id === "pomodoro") setTimerSessions((s) => s + 1);
    setUi((prev) => ({ ...prev, showTimeout: true }));
  }, [timerPreset]);

  // ── UI (toast / modal) ────────────────────────────────────────────────────
  const [ui, setUi] = useState({
    showTimeout: false, // PomodoroTimeOut toast
    showPopup:   false, // PomodoroPopUp modal
  });

  const dismissTimeout = useCallback(() => {
    setUi((prev) => ({ ...prev, showTimeout: false }));
  }, []);

  const openPopup = useCallback(() => {
    setUi((prev) => ({ ...prev, showTimeout: false, showPopup: true }));
  }, []);

  const closePopup = useCallback(() => {
    setUi((prev) => ({ ...prev, showPopup: false }));
  }, []);

  // ── Activity Log ──────────────────────────────────────────────────────────
  const [activityLog, setActivityLog] = useState([
    { id: 1, time: "09.00", type: "focus", title: "Focus Session", sub: "Pomodoro 25",        detail: "25 Menit", done: false },
    { id: 2, time: "09.00", type: "todo",  title: "To-do Today",   sub: "Menambah 1 tugas",   detail: "2 Task",   done: true  },
    { id: 3, time: "10.00", type: "water", title: "Drink Water",   sub: "Minum 1 Gelas Air",  detail: "1 Gelas",  done: true  },
  ]);

  function logActivity({ type, title, sub, detail }) {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")}`;
    setActivityLog((prev) => [
      {
        id:     Date.now(),
        time:   timeStr,
        type,
        title,
        sub,
        detail,
        done:   true,
      },
      ...prev,
    ]);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Derived / computed values
  // ─────────────────────────────────────────────────────────────────────────
  const timerProgress  = 1 - timerRemaining / (timerPreset.minutes * 60);
  const todayDoneCount = todos.filter((t) => t.done).length;
  const totalFocusMin  = timerSessions * 25; // rough: each session = 25 min

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Context value
  // ─────────────────────────────────────────────────────────────────────────
  const value = {
    // User
    user,
    updateUser,

    // Settings
    settings,
    updateSettings,

    // Mood
    mood,
    setTodayMood,
    MOOD_OPTIONS,

    // Hydration
    hydration,
    addGlass,
    removeGlass,
    HYDRATION_GOAL_GLASSES,

    // Todo
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearDoneTodos,
    todayDoneCount,

    // Timer
    timerPreset,
    setTimerPreset,
    timerRunning,
    timerRemaining,
    timerProgress,
    timerSessions,
    totalFocusMin,
    TIMER_PRESETS,
    startPauseTimer,
    resetTimer,
    finishTimerNow,

    // UI
    ui,
    dismissTimeout,
    openPopup,
    closePopup,

    // Activity Log
    activityLog,
    logActivity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Custom hook
// ─────────────────────────────────────────────────────────────────────────────
/**
 * useApp()
 * Access all app state and actions from any component inside <AppProvider>.
 *
 * @example
 * const { user, hydration, addGlass, timerRemaining, startPauseTimer } = useApp();
 */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside <AppProvider>. Make sure your component tree is wrapped.");
  }
  return ctx;
}

export default AppContext;
