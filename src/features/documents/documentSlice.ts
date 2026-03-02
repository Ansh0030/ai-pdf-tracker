import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface DocumentState {
    file: File | null;
    fileName: string | null;
    pageCount: number;
    currentPage: number;
    scale: number;
}

const initialState: DocumentState = {
    file: null,
    fileName: null,
    pageCount: 0,
    currentPage: 1,
    scale: 1.2,
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setFile(state, action: PayloadAction<File>) {
            state.file = action.payload;
            state.fileName = action.payload.name;
            state.currentPage = 1;
            state.pageCount = 0;
            state.scale = 1.2;
        },
        setDocument(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        zoomIn(state) {
            state.scale += 0.2;
        },
        zoomOut(state) {
            state.scale = Math.max(0.6, state.scale - 0.2);
        },
    },
});

export const {
    setFile,
    setDocument,
    setCurrentPage,
    zoomIn,
    zoomOut,
} = documentSlice.actions;

export default documentSlice.reducer;
