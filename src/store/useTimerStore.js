import { create } from "zustand";

// Simple Pomodoro store using Zustand.
// - Uses an `endTimestamp` so the timer keeps counting even when components unmount.
// - Keeps a lightweight `now` ticking every second while running so components update.
// - Persists minimal state to localStorage so a navigation/reload can restore the timer state.

const PRESETS = [
  { id: "pomodoro", label: "Pomodoro", minutes: 25 },
  { id: "short", label: "Short Break", minutes: 5 },
  { id: "long", label: "Long Break", minutes: 15 },
];

let tickInterval = null;
const STORAGE_KEY = "ff_timer";

const useTimerStore = create((set, get) => ({
  presets: PRESETS,
  presetId: PRESETS[0].id,
  running: false,
  endTimestamp: null, // ms epoch when timer will reach zero
  remainingSeconds: PRESETS[0].minutes * 60, // fallback when not running
  now: Date.now(),

  // Helpers
  getPreset: () => get().presets.find((p) => p.id === get().presetId),
  getRemaining: () => {
    const { endTimestamp, now, remainingSeconds } = get();
    if (!endTimestamp) return remainingSeconds;
    return Math.max(0, Math.ceil((endTimestamp - now) / 1000));
  },

  // Start the timer. If `fromSeconds` is provided, start from that value.
  start: (fromSeconds) => {
    const state = get();
    const remaining = typeof fromSeconds === 'number' ? fromSeconds : state.getRemaining();
    const end = Date.now() + remaining * 1000;

    // ensure single interval
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = setInterval(() => set({ now: Date.now() }), 1000);

    set({ running: true, endTimestamp: end, remainingSeconds: remaining, now: Date.now() });

    // persist minimal state
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ presetId: get().presetId, endTimestamp: end, running: true }));
    } catch (e) {}
  },

  // Pause and keep remainingSeconds so the timer can be resumed
  pause: () => {
    const rem = get().getRemaining();
    if (tickInterval) {
      clearInterval(tickInterval);
      tickInterval = null;
    }
    set({ running: false, endTimestamp: null, remainingSeconds: rem });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ presetId: get().presetId, remainingSeconds: rem, running: false }));
    } catch (e) {}
  },

  // Reset to current preset default
  reset: () => {
    const p = get().presets.find((p) => p.id === get().presetId) || PRESETS[0];
    if (tickInterval) {
      clearInterval(tickInterval);
      tickInterval = null;
    }
    set({ running: false, endTimestamp: null, remainingSeconds: p.minutes * 60, now: Date.now() });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  },

  // Change preset (stops timer)
  setPreset: (id) => {
    const p = get().presets.find((x) => x.id === id) || PRESETS[0];
    if (tickInterval) {
      clearInterval(tickInterval);
      tickInterval = null;
    }
    set({ presetId: p.id, running: false, endTimestamp: null, remainingSeconds: p.minutes * 60, now: Date.now() });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  },

  // Restore from localStorage (called on module load)
  restoreFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.presetId) set({ presetId: s.presetId });

      if (s.endTimestamp) {
        // If endTimestamp is in the future, resume running; else set remaining to 0
        const now = Date.now();
        if (s.endTimestamp > now) {
          set({ endTimestamp: s.endTimestamp, now });
          if (s.running) {
            // start internal tick and ensure state is consistent
            if (tickInterval) clearInterval(tickInterval);
            tickInterval = setInterval(() => set({ now: Date.now() }), 1000);
            set({ running: true });
          }
        } else {
          set({ running: false, endTimestamp: null, remainingSeconds: 0, now });
        }
      } else if (typeof s.remainingSeconds === 'number') {
        set({ remainingSeconds: s.remainingSeconds, running: !!s.running, now: Date.now() });
      }
    } catch (e) {
      // ignore
    }
  },
}));

// Initialize from storage on import so the store reflects persisted state immediately.
useTimerStore.getState().restoreFromStorage();

export default useTimerStore;
