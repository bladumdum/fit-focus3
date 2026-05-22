import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="min-h-screen w-screen bg-[#F6F4DD] flex font-sans">
      {/* Sidebar di kiri */}
      <Sidebar />

      {/* Area konten utama di kanan */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  );
}