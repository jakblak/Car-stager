import React from 'react';

interface ResultsGridProps {
  imageUrls: string[];
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ imageUrls }) => {
  return (
    <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-200 text-center mb-4">Generated Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
                <div key={index} className="relative group aspect-video">
                    <img
                        src={url}
                        alt={`Generated car image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <a
                        href={url}
                        download={`staged-car-${index + 1}.png`}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <div className="flex items-center gap-2 bg-white/90 text-gray-900 font-bold py-2 px-4 rounded-full backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Download</span>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ResultsGrid;