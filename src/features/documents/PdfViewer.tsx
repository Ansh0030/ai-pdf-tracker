import { memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    setCurrentPage,
    setDocument,
    zoomIn,
    zoomOut,
} from "./documentSlice";

// ✅ Correct worker for Vite
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function PdfViewer() {
    const dispatch = useAppDispatch();

    const { file, pageCount, currentPage, scale } =
        useAppSelector((state) => state.document);

    if (!file) {
        return (
            <div className="text-gray-500 text-center mt-6">
                No PDF uploaded yet.
            </div>
        );
    }

    return (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow">

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-4">

                {/* Zoom Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={() => dispatch(zoomOut())}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        −
                    </button>

                    <button
                        onClick={() => dispatch(zoomIn())}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>
                </div>

                {/* Page Info */}
                <span className="text-sm font-medium">
          Page {currentPage} of {pageCount || "--"}
        </span>

                {/* Navigation */}
                <div className="flex gap-2">
                    <button
                        disabled={currentPage <= 1}
                        onClick={() =>
                            dispatch(setCurrentPage(currentPage - 1))
                        }
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <button
                        disabled={currentPage >= pageCount}
                        onClick={() =>
                            dispatch(setCurrentPage(currentPage + 1))
                        }
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* PDF Page */}
            <div className="flex justify-center">
                <div className="transition-all duration-300 ease-in-out">
                    <Document
                        file={file}
                        onLoadSuccess={({ numPages }) => {
                            dispatch(setDocument({ pageCount: numPages }));
                        }}
                        loading={<div>Loading PDF...</div>}
                    >
                        <Page
                            key={currentPage}
                            pageNumber={currentPage}
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </div>
        </div>
    );
}

export default memo(PdfViewer);
