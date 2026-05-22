import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import RegisterPage from "../features/auth/Register";
import LoginPage from "../features/auth/Login";
import PemilihanMood from "../features/mood/PemilihanMood";
import Dashboard from "../pages/Dashboard";
import PengaturanPage from "../pages/PengaturanPage";
import UserAccount from "../pages/settings/UserAccount";
import BahasadanNotifPage from "../pages/settings/BahasadanNotifPage";
import FicoAssistant from "../features/ai-assistant/FicoAssistant";
import History from "../features/Histori/History";
import Statistics from "../features/statistics/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/pengaturan", element: <PengaturanPage /> },
      { path: "/asisten", element: <FicoAssistant /> },
      { path: "/riwayat", element: <History /> },
      { path: "/statistik", element: <Statistics /> },
    ],
  },
  // Standalone pages (no sidebar)
  { path: "/pengaturan/akun", element: <UserAccount /> },
  { path: "/pengaturan/bahasa", element: <BahasadanNotifPage /> },
]);

