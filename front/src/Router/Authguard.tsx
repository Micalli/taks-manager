import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../app/contexts/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { singnedIn } = useAuth();

  if (!singnedIn && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (singnedIn && !isPrivate) {
    return <Navigate to="/tasks" replace />;
  }
  return <Outlet />;
}
