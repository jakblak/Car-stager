import React, { useState, useCallback, useMemo } from 'react';

interface MultiImageUploaderProps {
  onImagesUpload: (files: File[]) => void;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ onImagesUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const imageUrls = useMemo(() => imageFiles.map(file => URL.createObjectURL(file)), [imageFiles]);

  const handleFilesChange = (incomingFiles: FileList | null) => {
    if (incomingFiles) {
      const newFiles = Array.from(incomingFiles);
      const updatedFiles = [...imageFiles, ...newFiles];
      setImageFiles(updatedFiles);
      onImagesUpload(updatedFiles);
    }
  };
  
  const removeImage = (indexToRemove: number) => {
    const updatedFiles = imageFiles.filter((_, index) => index !== indexToRemove);
    setImageFiles(updatedFiles);
    onImagesUpload(updatedFiles);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFilesChange(e.dataTransfer.files);
  }, [imageFiles, onImagesUpload]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-3">1. Upload Car Images</h2>
      {imageUrls.length === 0 ? (
        <label
          htmlFor="file-upload"
          className={`flex flex-col justify-center items-center w-full h-48 px-6 transition bg-gray-900 border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none ${isDragging ? 'border-blue-400' : 'border-gray-600'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="mt-2 font-medium text-gray-400">
              Drop files here, or <span className="text-blue-400">browse</span>
            </span>
            <span className="text-xs text-gray-500">Upload one or more images</span>
        </label>
      ) : (
        <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                    <img src={url} alt={`upload-preview-${index}`} className="w-full h-24 object-cover rounded-md" />
                    <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full p-1 leading-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            ))}
            <label htmlFor="file-upload" className="flex items-center justify-center w-full h-24 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer transition-colors">
                <span className="text-2xl text-gray-400">+</span>
            </label>
        </div>
      )}
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        multiple
        className="sr-only"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => handleFilesChange(e.target.files)}
      />
    </div>
  );
};

export default MultiImageUploader;