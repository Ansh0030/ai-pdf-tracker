import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setFile } from "./documentSlice";
import { clearChat } from "../chat/chatSlice";

export default function UploadZone() {
    const dispatch = useAppDispatch();
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file: File) => {
        if (file.type !== "application/pdf") {
            alert("Only PDF files allowed");
            return;
        }

        dispatch(setFile(file));
        dispatch(clearChat());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files?.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`w-full p-12 mb-6 border-2 border-dashed rounded-lg text-center transition-all duration-200 ${
                isDragging
                    ? "bg-gray-200 border-gray-500"
                    : "bg-gray-100 border-gray-300"
            }`}
        >
            <p className="text-lg font-medium mb-2">
                Drag & Drop your PDF here
            </p>

            <p className="text-sm text-gray-600 mb-4">
                or click below to select file
            </p>

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                    if (e.target.files?.length) {
                        handleFile(e.target.files[0]);
                    }
                }}
                className="ml-34"
            />
        </div>
    );
}
