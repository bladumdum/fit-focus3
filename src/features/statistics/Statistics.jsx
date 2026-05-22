import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const STATS = [
  { id: "focus", label: "Focus Today", value: "3h 12m" },
  { id: "pomos", label: "Pomodoros", value: "6" },
  { id: "tasks", label: "Tasks Done", value: "14" },
  { id: "mood", label: "Mood Avg", value: "Semangat" },
];

const activity = [
  { id: 1, text: "Completed task: Design wireframes", time: "2h ago" },
  { id: 2, text: "Pomodoro finished", time: "4h ago" },
  { id: 3, text: "Mood logged: Semangat", time: "1d ago" },
];

export default function Statistics() {
  return (
    <div className="min-h-screen bg-[#F6F4DD] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Statistics</h1>
            <p className="text-sm text-gray-600">
              Overview of your productivity and mood trends
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => {}}>Export</Button>
            <button className="px-3 py-2 rounded-lg bg-white shadow-sm">
              Share
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {STATS.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl shadow p-4">
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className="text-2xl font-semibold text-[#0f172a] mt-2">
                {s.value}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card
              title="Focus Time (7 days)"
              subtitle="Minutes focused per day">
              <div className="w-full h-52 flex items-center justify-center">
                {/* Simple SVG line chart placeholder */}
                <svg viewBox="0 0 200 80" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#0a7d56"
                    strokeWidth="3"
                    points="0,60 30,40 60,50 90,20 120,30 150,10 180,30 200,20"
                  />
                  <g fill="#0a7d56">
                    <circle cx="0" cy="60" r="2.5" />
                    <circle cx="30" cy="40" r="2.5" />
                    <circle cx="60" cy="50" r="2.5" />
                    <circle cx="90" cy="20" r="2.5" />
                    <circle cx="120" cy="30" r="2.5" />
                    <circle cx="150" cy="10" r="2.5" />
                    <circle cx="180" cy="30" r="2.5" />
                    <circle cx="200" cy="20" r="2.5" />
                  </g>
                </svg>
              </div>
            </Card>
          </div>

          <div>
            <Card title="Recent Activity" subtitle="What you did recently">
              <ul className="flex flex-col gap-3">
                {activity.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm text-gray-800">{a.text}</div>
                      <div className="text-xs text-gray-400">{a.time}</div>
                    </div>
                    <div className="text-xs text-gray-400"> </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
