import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import documentReducer from "../features/documents/documentSlice";
import chatReducer from "../features/chat/chatSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        document: documentReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

