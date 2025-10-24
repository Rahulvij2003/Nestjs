import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface ProtectedRouteProps {
  children: ReactElement; // Correct type for a single JSX element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Properly typed selector
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />; // redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
