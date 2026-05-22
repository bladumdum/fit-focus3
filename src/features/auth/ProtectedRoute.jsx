import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const moodSelected = localStorage.getItem("mood_selected");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (moodSelected !== "true") {
    return <Navigate to="/pemilihan-mood" replace />;
  }

  return children;
};

export default ProtectedRoute;
