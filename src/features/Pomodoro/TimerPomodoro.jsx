import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import PomodoroTimeOut from "./PomodoroTimeOut";

const PRESETS = [
	{ id: "pomodoro", label: "Pomodoro", minutes: 25 },
	{ id: "short", label: "Short Break", minutes: 5 },
	{ id: "long", label: "Long Break", minutes: 15 },
];

function formatTime(seconds) {
	const m = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");
	const s = Math.floor(seconds % 60)
		.toString()
		.padStart(2, "0");
	return `${m}:${s}`;
}

export default function TimerPomodoro() {
	const [preset, setPreset] = useState(PRESETS[0]);
	const [running, setRunning] = useState(false);
	const [remaining, setRemaining] = useState(preset.minutes * 60);
	const [showTimeout, setShowTimeout] = useState(false);
	const intervalRef = useRef(null);

	// when preset changes, reset timer
	useEffect(() => {
		setRemaining(preset.minutes * 60);
		setRunning(false);
	}, [preset]);

	useEffect(() => {
		if (running) {
			intervalRef.current = setInterval(() => {
				setRemaining((r) => {
					if (r <= 1) {
						clearInterval(intervalRef.current);
						setRunning(false);
						setShowTimeout(true); // 🔔 trigger notification
						return 0;
					}
					return r - 1;
				});
			}, 1000);
		}

		return () => clearInterval(intervalRef.current);
	}, [running]);

	const total = preset.minutes * 60;
	const progress = 1 - remaining / total;

	const handleStartPause = () => setRunning((r) => !r);
	const handleReset = () => {
		clearInterval(intervalRef.current);
		setRunning(false);
		setRemaining(preset.minutes * 60);
	};

	// SVG ring params
	const R = 72;
	const C = 2 * Math.PI * R;

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F6F4DD] p-6">
			<div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
				<header className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">Pomodoro Timer</h2>
					<div className="flex gap-2">
						{PRESETS.map((p) => (
							<button
								key={p.id}
								onClick={() => setPreset(p)}
								className={`px-3 py-1 rounded-lg text-sm ${preset.id === p.id ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}>
								{p.label}
							</button>
						))}
					</div>
				</header>

				<main className="flex flex-col items-center gap-6">
					<div className="relative w-44 h-44">
						<svg className="w-44 h-44" viewBox={`0 0 ${2 * (R + 6)} ${2 * (R + 6)}`}>
							<g transform={`translate(${R + 6}, ${R + 6})`}>
								<circle r={R} fill="transparent" stroke="#eef2f6" strokeWidth="12" />
								<circle
									r={R}
									fill="transparent"
									stroke="#0a7d56"
									strokeWidth="12"
									strokeLinecap="round"
									strokeDasharray={`${C}`}
									strokeDashoffset={`${C - C * progress}`}
									transform="rotate(-90)"
								/>
							</g>
						</svg>

						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<div className="text-4xl font-mono font-semibold">{formatTime(remaining)}</div>
							<div className="text-sm text-gray-500 mt-1">{preset.label}</div>
						</div>
					</div>

					<div className="flex gap-3">
						<Button onClick={handleStartPause}>{running ? "Pause" : "Start"}</Button>
						<button onClick={handleReset} className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">Reset</button>
					</div>
				</main>
			</div>

			{/* Timeout toast notification */}
			<PomodoroTimeOut
				visible={showTimeout}
				onClose={() => setShowTimeout(false)}
			/>
		</div>
	);
}
