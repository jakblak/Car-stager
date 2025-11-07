import React from 'react';

interface AdvancedOptionsProps {
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ customPrompt, onCustomPromptChange }) => {
  return (
    <div>
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <h2 className="text-xl font-semibold text-gray-200">5. Advanced Customization</h2>
          <span className="transition-transform transform group-open:rotate-180">
            <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </summary>
        <div className="mt-3">
            <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-400 mb-1">
                Add specific instructions for the AI.
            </label>
            <textarea
                id="custom-prompt"
                rows={3}
                value={customPrompt}
                onChange={(e) => onCustomPromptChange(e.target.value)}
                placeholder="e.g., Make the car look wet as if it just rained. Add dramatic clouds in the sky."
                className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
      </details>
    </div>
  );
};

export default AdvancedOptions;