import React from "react";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header Profile */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-[#90d2a4] rounded-xl flex items-center justify-center border-2 border-black">
          <span className="text-2xl">✨</span> {/* Placeholder Mascot */}
        </div>
        <h1 className="text-3xl font-bold text-[#1F4B3F]">Halo, Alex!</h1>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: Pomodoro Health */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] shadow-sm p-8 flex flex-col items-center border border-gray-100">
          <h2 className="text-xl font-bold text-[#1A365D] mb-8">Pomodoro Health</h2>
          
          <div className="text-7xl font-bold text-[#20409A] mb-6 tracking-tighter">
            17:45
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div className="bg-[#20409A] h-3 rounded-full" style={{ width: "65%" }}></div>
          </div>
          
          <div className="flex gap-4 mb-10">
            <button className="px-6 py-2 border-2 border-[#20409A] rounded-full text-[#20409A] font-semibold hover:bg-blue-50 text-sm">
              Pause
            </button>
            <button className="px-6 py-2 border-2 border-[#20409A] rounded-full text-[#20409A] font-semibold hover:bg-blue-50 text-sm">
              End Task
            </button>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-[#20409A] font-medium mb-1">Istirahat Aktif Mendatang</p>
            <p className="text-[#4A65A4] text-sm">In 11 Minutes</p>
          </div>
          
          <div className="mt-auto flex items-center gap-3">
            <div className="w-10 h-10 bg-[#90d2a4] rounded-lg border-2 border-black flex items-center justify-center">
              <span className="text-sm">✨</span>
            </div>
            <span className="text-[#20409A] font-bold text-xl">Semangat !</span>
          </div>
        </div>

        {/* Kolom Kanan: Widget Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Widget: Hidrasi */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3">Hidrasi</h3>
              <div className="bg-white rounded-[1.5rem] shadow-sm p-6 border border-gray-100 h-36 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#20409A]">4 Glass</span>
                  <button className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-lg hover:bg-gray-50">
                    +
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2 border border-black">
                  <div className="bg-[#20409A] h-full rounded-full" style={{ width: "50%" }}></div>
                </div>
                <p className="text-xs text-[#4A65A4] text-center mt-1">Hydration for today : 4/8</p>
              </div>
            </div>

            {/* Widget: To-do Today */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3">To - do Today</h3>
              <div className="bg-white rounded-[1.5rem] shadow-sm p-6 border border-gray-100 h-36 flex flex-col justify-between">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <span className="text-xs text-gray-700">Tugas Projek uas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <span className="text-xs text-gray-700">Projek SKS pak oni</span>
                  </li>
                </ul>
                <button className="w-full py-1.5 mt-2 border border-gray-300 rounded-full text-xs text-gray-600 font-semibold hover:bg-gray-50">
                  + Tambah Task
                </button>
              </div>
            </div>
          </div>

          {/* Widget: Statistik Hari Ini */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-gray-800 font-semibold mb-3">Statistik Hari Ini</h3>
            <div className="bg-white rounded-[1.5rem] shadow-sm p-6 border border-gray-100 flex-1 flex flex-col">
              <div className="flex justify-around text-xs text-gray-500 mb-4">
                <span>Sesi 1</span>
                <span>Sesi 2</span>
                <span>Sesi 3</span>
              </div>
              <div className="relative flex-1 w-full border-l border-b border-gray-200 mt-2">
                {/* Labels sumbu Y */}
                <div className="absolute -left-6 bottom-0 text-xs text-gray-400">0</div>
                <div className="absolute -left-6 bottom-[25%] text-xs text-gray-400">4</div>
                <div className="absolute -left-6 bottom-[50%] text-xs text-gray-400">8</div>
                <div className="absolute -left-6 bottom-[75%] text-xs text-gray-400">12</div>
                <div className="absolute -left-6 top-0 text-xs text-gray-400">20</div>
                
                {/* Visualisasi Garis Statistik */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 20,20 Q 40,90 50,100 T 80,100" fill="none" stroke="#D8D4F2" strokeWidth="3" />
                  {/* Fill area bawah kurva */}
                  <path d="M 20,20 Q 40,90 50,100 T 80,100 L 80,100 L 20,100 Z" fill="#EBE9F8" opacity="0.5" />
                  <circle cx="20" cy="20" r="2" fill="white" stroke="#A89FDF" strokeWidth="1.5" />
                  <circle cx="50" cy="100" r="2" fill="white" stroke="#A89FDF" strokeWidth="1.5" />
                  <circle cx="80" cy="100" r="2" fill="white" stroke="#A89FDF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Tips */}
      <div className="bg-[#F8F9FA] rounded-[1.5rem] shadow-sm border border-gray-200 p-2 flex items-center gap-4 mt-2">
        <div className="bg-white px-8 py-3 rounded-xl border border-gray-200 text-lg">
          Tips
        </div>
        <p className="text-gray-800 text-sm md:text-base pr-4">
          Fokus pada satu hal dalam satu waktu untuk hasil yang lebih maksimal
        </p>
      </div>
      
    </div>
  );
}