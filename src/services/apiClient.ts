import axios from "axios";
import { store } from "../store/store";
import { loginSuccess, logout } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: "https://mock.api",
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const newToken = "new-mock-token";

                    store.dispatch(
                        loginSuccess({
                            ...store.getState().auth,
                            accessToken: newToken,
                        })
                    );

                    processQueue(null, newToken);
                    isRefreshing = false;
                    resolve(api(originalRequest));
                }, 1000);
            });
        }

        return Promise.reject(error);
    }
);

export default api;
