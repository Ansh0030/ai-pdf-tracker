import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface DocumentState {
    file: File | null;
    fileName: string | null;
    pageCount: number;
    currentPage: number;
}

const initialState: DocumentState = {
    file: null,
    fileName: null,
    pageCount: 0,
    currentPage: 1,
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
        },
        setDocument(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const { setFile, setDocument, setCurrentPage } =
    documentSlice.actions;

export default documentSlice.reducer;
