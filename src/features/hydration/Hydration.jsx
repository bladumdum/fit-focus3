import React, { useEffect } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import useWellnessStore from "../../store/useWellnessStore";

export default function Hydration() {
  const GOAL = 2000; // ml
  const waterIntake = useWellnessStore((s) => s.waterIntake);
  const addWater = useWellnessStore((s) => s.addWater);
  const resetWater = useWellnessStore((s) => s.resetWater);
  const checkAndResetDaily = useWellnessStore((s) => s.checkAndResetDaily);

  useEffect(() => {
    checkAndResetDaily();
  }, [checkAndResetDaily]);

  const drank = Math.min(GOAL, waterIntake * 250);
  const remaining = Math.max(0, GOAL - drank);

  const add = (glasses) => {
    for (let i = 0; i < glasses; i += 1) {
      addWater();
    }
  };

  // ring
  const R = 56;
  const C = 2 * Math.PI * R;
  const progress = Math.min(1, drank / GOAL);

  return (
    <div className="min-h-screen bg-[#F6F4DD] p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Hydration</h1>
          <p className="text-sm text-gray-600">Track your daily water intake</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Daily Goal" subtitle={`${GOAL} ml`}>
            <div className="flex items-center gap-6">
              <div className="relative">
                <svg className="w-36 h-36" viewBox={`0 0 ${2 * (R + 6)} ${2 * (R + 6)}`}>
                  <g transform={`translate(${R + 6}, ${R + 6})`}>
                    <circle r={R} fill="transparent" stroke="#eef2f6" strokeWidth="12" />
                    <circle
                      r={R}
                      fill="transparent"
                      stroke="#06b6d4"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${C}`}
                      strokeDashoffset={`${C - C * progress}`}
                      transform="rotate(-90)"
                    />
                  </g>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-semibold">{Math.round(drank / 1000 * 10) / 10} L</div>
                  <div className="text-xs text-gray-500">drank</div>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-sm text-gray-700 mb-3">Add water quickly</div>
                <div className="flex gap-2 mb-3">
                  <Button onClick={() => add(1)}>+250 ml</Button>
                  <Button onClick={() => add(2)}>+500 ml</Button>
                </div>
                <div className="text-sm text-gray-500 mb-3">Glasses: <span className="text-primary font-semibold">{waterIntake}</span></div>
                <Button onClick={resetWater} className="w-full">
                  Reset Water
                </Button>
                <div className="text-sm text-gray-500">Remaining: <span className="text-primary font-semibold">{remaining} ml</span></div>
              </div>
            </div>
          </Card>

          <Card title="History" subtitle="Today">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded"><div>250 ml</div><div className="text-xs text-gray-400">10:30</div></li>
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded"><div>500 ml</div><div className="text-xs text-gray-400">09:15</div></li>
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded"><div>250 ml</div><div className="text-xs text-gray-400">08:40</div></li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
