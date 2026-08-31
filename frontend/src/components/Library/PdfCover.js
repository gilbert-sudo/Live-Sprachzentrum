import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfCover({ pdfUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-surface-container-low relative">
      <Document
        file={pdfUrl}
        onLoadSuccess={() => setIsLoaded(true)}
        loading={
          <div className="flex flex-col items-center justify-center h-full text-secondary w-full h-full absolute inset-0 bg-surface-container-low z-10">
            <span className="material-symbols-outlined animate-spin mb-2">sync</span>
            <span className="text-xs">Laden...</span>
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center h-full text-germany-red w-full h-full absolute inset-0 bg-surface-container-low z-10">
            <span className="material-symbols-outlined">broken_image</span>
          </div>
        }
        className="w-full flex items-center justify-center"
      >
        <Page 
          pageNumber={1} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          width={250} // Thumbnail width
          className="shadow-md transition-opacity duration-300"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </Document>
    </div>
  );
}
