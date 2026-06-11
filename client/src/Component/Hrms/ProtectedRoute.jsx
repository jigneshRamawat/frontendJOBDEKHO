import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContect";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/hrm-login" replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/hrms" replace />;
  }

  return children;
}

export default ProtectedRoute;