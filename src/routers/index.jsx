import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";

import LoginPage from "../features/auth/Login";

import Dashboard from "../pages/Dashboard";
import PengaturanPage from "../pages/PengaturanPage";

import FicoAssistant from "../features/ai-assistant/FicoAssistant";

import History from "../features/Histori/History";

import Statistics from "../features/statistics/Statistics";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import RegisterPage from "../features/auth/Register";
import PemilihanMood from "../features/mood/PemilihanMood";

export const router = createBrowserRouter([
  // AUTH PAGE
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  // PEMILIHAN MOOD PAGE
  {
    path: "/pemilihan-mood",
    element: (
      <ProtectedRoute>
        <PemilihanMood />
      </ProtectedRoute>
    ),
  },

  // APP PAGE
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "/pengaturan",
        element: <PengaturanPage />,
      },

      {
        path: "/asisten",
        element: <FicoAssistant />,
      },

      {
        path: "/riwayat",
        element: <History />,
      },

      {
        path: "/statistik",
        element: <Statistics />,
      },
    ],
  },
]);
