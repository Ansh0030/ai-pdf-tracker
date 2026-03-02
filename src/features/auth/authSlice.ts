import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: { name: string } | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<AuthState>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        restoreSession(state, action: PayloadAction<AuthState>) {
            return action.payload;
        },
    },
});

export const { loginSuccess, logout, restoreSession } =
    authSlice.actions;
export default authSlice.reducer;
