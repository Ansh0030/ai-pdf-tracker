let file: File | null = null;

export const setCurrentFile = (newFile: File) => {
    file = newFile;
};

export const currentFile = file;
