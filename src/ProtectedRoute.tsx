import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type {RootState} from "./store/store.ts";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth?.isAuthenticated
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
