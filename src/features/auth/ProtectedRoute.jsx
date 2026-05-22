import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const moodSelected = localStorage.getItem("mood_selected");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Prevent infinite redirect if they are already on the mood selection page
  if (moodSelected !== "true" && location.pathname !== "/pemilihan-mood") {
    return <Navigate to="/pemilihan-mood" replace />;
  }

  return children;
};

export default ProtectedRoute;
