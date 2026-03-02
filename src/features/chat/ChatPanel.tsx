import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addMessage, setLoading } from "./chatSlice";
import { v4 as uuid } from "uuid";

export default function ChatPanel() {
    const dispatch = useAppDispatch();
    const { messages, loading } = useAppSelector((s) => s.chat);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: uuid(),
            role: "user" as const,
            content: input,
        };

        dispatch(addMessage(userMessage));
        dispatch(setLoading(true));
        setInput("");

        // 🔥 Mock AI delay
        setTimeout(() => {
            dispatch(
                addMessage({
                    id: uuid(),
                    role: "assistant",
                    content: `AI Response to: "${userMessage.content}"`,
                })
            );
            dispatch(setLoading(false));
        }, 1000);
    };

    return (
        <div className="w-full max-w-md border-l pl-4 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-2 rounded text-sm ${
                            msg.role === "user"
                                ? "bg-blue-100 text-right"
                                : "bg-gray-200"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}

                {loading && <div className="text-gray-500 text-sm">AI typing...</div>}
            </div>

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                    placeholder="Ask about this document..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
