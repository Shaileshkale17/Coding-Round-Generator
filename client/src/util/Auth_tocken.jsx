import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("token") || null ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
