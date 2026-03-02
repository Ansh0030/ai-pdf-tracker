import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserMessage, answerQuestion } from "./chatSlice";
import type {RootState} from "../../store/store.ts";

const presetQuestions = [
    "What is the company name?",
    "What is the role?",
    "What is the salary?",
];

const ChatBot = () => {
    const messages = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        dispatch(addUserMessage(input));
        dispatch(answerQuestion(input));
        setInput("");
    };

    const handlePresetClick = (question: string) => {
        dispatch(addUserMessage(question));
        dispatch(answerQuestion(question));
    };

    return (
        <div className="border p-4 w-[400px] h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-2">
                {messages.map((msg) => (
                    <div key={msg.id} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`${msg.sender === "user" ? "bg-blue-300" : "bg-gray-300"} p-2 rounded`}>
              {msg.text}
            </span>
                    </div>
                ))}
            </div>

            <div className="mb-2">
                <div className="flex gap-2 flex-wrap">
                    {presetQuestions.map((q) => (
                        <button
                            key={q}
                            onClick={() => handlePresetClick(q)}
                            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 border p-2 rounded"
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
