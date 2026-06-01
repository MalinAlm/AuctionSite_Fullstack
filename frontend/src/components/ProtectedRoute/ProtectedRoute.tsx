import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
