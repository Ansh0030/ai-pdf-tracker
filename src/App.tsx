import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { restoreSession, logout } from "./features/auth/authSlice";
import LoginPage from "./features/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

import UploadZone from "./features/documents/UploadZone";
import PdfViewer from "./features/documents/PdfViewer";
import ChatPanel from "./features/chat/ChatPanel";

function Dashboard() {
    const dispatch = useAppDispatch();

    return (
        <div className="flex h-screen p-6 gap-6">
            <div className="flex-1 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Dashboard</h1>

                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>

                <UploadZone />
                <PdfViewer />
            </div>

            <div className="w-[400px] border-l pl-4">
                <ChatPanel />
            </div>
        </div>
    );
}

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (stored) {
            dispatch(restoreSession(JSON.parse(stored)));
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
