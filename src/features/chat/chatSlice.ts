import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface ChatState {
    messages: Message[];
    loading: boolean;
}

const initialState: ChatState = {
    messages: [],
    loading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        clearChat(state) {
            state.messages = [];
        },
    },
});

export const { addMessage, setLoading, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
