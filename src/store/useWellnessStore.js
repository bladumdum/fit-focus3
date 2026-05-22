import { create } from "zustand";
import { persist } from "zustand/middleware";

const getToday = () => new Date().toISOString().slice(0, 10);

const useWellnessStore = create(
	persist(
		(set, get) => ({
			currentMood: null,
			waterIntake: 0,
			sleepHours: 0,
			lastUpdated: getToday(),

			setMood: (mood) => {
				set({ currentMood: mood, lastUpdated: getToday() });
			},

			addWater: () => {
				set((state) => ({
					waterIntake: state.waterIntake + 1,
					lastUpdated: getToday(),
				}));
			},

			resetWater: () => {
				set({ waterIntake: 0, lastUpdated: getToday() });
			},

			setSleepHours: (hours) => {
				set({ sleepHours: hours, lastUpdated: getToday() });
			},

			checkAndResetDaily: () => {
				const today = getToday();
				if (get().lastUpdated !== today) {
					set({
						currentMood: null,
						waterIntake: 0,
						sleepHours: 0,
						lastUpdated: today,
					});
				}
			},
		}),
		{
			name: "wellness-storage",
			storage:
				typeof window !== "undefined"
					? {
							getItem: (key) => {
								const val = window.localStorage.getItem(key);
								return val ? JSON.parse(val) : null;
							},
							setItem: (key, val) =>
								window.localStorage.setItem(key, JSON.stringify(val)),
							removeItem: (key) => window.localStorage.removeItem(key),
					  }
					: undefined,
		}
	)
);

export default useWellnessStore;
