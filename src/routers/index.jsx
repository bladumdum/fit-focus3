import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MoodSelectionPage from "../pages/MoodSelectionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MoodSelectionPage /> },
      { path: "/login", element: <RegisterPage /> },
    ],
  },
]);
