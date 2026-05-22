import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import PomodoroTimeOut from "./PomodoroTimeOut";
import PomodoroPopUp from "./PomodoroPopUp";
import useTimerStore from "../../store/useTimerStore";

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
	const presets = useTimerStore((s) => s.presets);
	const presetId = useTimerStore((s) => s.presetId);
	const preset = presets.find((p) => p.id === presetId) || presets[0];

	const running = useTimerStore((s) => s.running);
	const remaining = useTimerStore((s) => s.getRemaining());

	const start = useTimerStore((s) => s.start);
	const pause = useTimerStore((s) => s.pause);
	const resetStore = useTimerStore((s) => s.reset);
	const setPreset = useTimerStore((s) => s.setPreset);

	const [showTimeout, setShowTimeout] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const notifiedRef = useRef(false);

	// When remaining reaches 0, show timeout toast
	useEffect(() => {
		if (remaining <= 0 && running === false) {
			setShowTimeout(true);

			// notify once per completion
			if (!notifiedRef.current) {
				notifiedRef.current = true;
				// Desktop notification
				try {
					if (typeof Notification !== "undefined") {
						if (Notification.permission === "granted") {
							new Notification("Waktu Selesai", { body: `${preset.label} selesai! Saatnya istirahat.` });
						} else if (Notification.permission !== "denied") {
							Notification.requestPermission().then((perm) => {
								if (perm === "granted") {
									new Notification("Waktu Selesai", { body: `${preset.label} selesai! Saatnya istirahat.` });
								}
							});
						}
					}
				} catch (e) {}

				// short beep via WebAudio
				try {
					const ctx = new (window.AudioContext || window.webkitAudioContext)();
					const o = ctx.createOscillator();
					const g = ctx.createGain();
					o.type = "sine";
					o.frequency.value = 880;
					g.gain.value = 0.05;
					o.connect(g);
					g.connect(ctx.destination);
					o.start();
					setTimeout(() => {
						o.stop();
						ctx.close();
					}, 400);
				} catch (e) {}
			}
		}
	}, [remaining, running]);

	// reset notification flag when starting or resetting
	useEffect(() => {
		if (running) notifiedRef.current = false;
	}, [running]);

	const total = preset.minutes * 60;
	const progress = 1 - remaining / total;

	const handleStartPause = () => {
		if (running) pause();
		else start();
	};

	const handleReset = () => {
		resetStore();
		setShowTimeout(false);
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
						{presets.map((p) => (
							<button
								key={p.id}
								onClick={() => setPreset(p.id)}
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
				onOpenPopup={() => {
					setShowTimeout(false);
					setShowPopup(true);
				}}
			/>

			<PomodoroPopUp visible={showPopup} onClose={() => setShowPopup(false)} />
		</div>
	);
}
