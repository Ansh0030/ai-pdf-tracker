import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
}

interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: [],
};

// Preset questions and answers
const presetQA: Record<string, string> = {
    "What is the company name?": "The company name is Trinetra Solutions.",
    "What is the role?": "The role is Senior Frontend Engineer.",
    "What is the salary?": "The salary is 9–12 LPA.",
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addUserMessage: (state, action: PayloadAction<string>) => {
            state.messages.push({ id: crypto.randomUUID(), sender: "user", text: action.payload });
        },
        addBotMessage: (state, action: PayloadAction<string>) => {
            state.messages.push({ id: crypto.randomUUID(), sender: "bot", text: action.payload });
        },
        answerQuestion: (state, action: PayloadAction<string>) => {
            const question = action.payload;
            const answer = presetQA[question] || "No result found.";
            state.messages.push({ id: crypto.randomUUID(), sender: "bot", text: answer });
        },
        clearChat: (state) => {
            state.messages = [];
        },
    },
});

export const { addUserMessage, addBotMessage, answerQuestion, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
