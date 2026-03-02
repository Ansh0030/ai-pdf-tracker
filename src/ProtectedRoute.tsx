import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

export default function ProtectedRoute({ children }: any) {
    const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
    return isAuth ? children : <Navigate to="/login" />;
}
