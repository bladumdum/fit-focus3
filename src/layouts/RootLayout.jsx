import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-[#F6F4DD] backdrop-blur-md">
      <Outlet />
    </div>
  );
}
