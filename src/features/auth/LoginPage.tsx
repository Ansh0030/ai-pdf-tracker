import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "./authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);

        // Simulate API login
        setTimeout(() => {
            dispatch(
                loginSuccess({
                    accessToken: "mock-access-token",
                    refreshToken: "mock-refresh-token",
                    user: { name: "Ansh" },
                    isAuthenticated: true,
                })
            );

            setLoading(false);
            navigate("/");
        }, 1000);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}
