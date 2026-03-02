import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "../features/documents/documentSlice";
import chatReducer from "../features/chat/chatSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        document: documentReducer,
        chat: chatReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ["document.file"],
                ignoredActions: ["document/setFile"],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
