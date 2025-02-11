import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user, isGuest } = useContext(AuthContext); // ✅ Use `isGuest` from context
  const token = localStorage.getItem("token");

  // ✅ Fix: Ensure the user OR guest can access protected pages
  if (!user && !token && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
