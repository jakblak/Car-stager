import React from 'react';
import { EnvironmentKey } from '../types';

interface EnvironmentSelectorProps {
  selectedEnvironment: EnvironmentKey;
  onEnvironmentChange: (environment: EnvironmentKey) => void;
}

const environmentOptions: { key: EnvironmentKey; label: string }[] = [
  { key: 'Showroom', label: 'Showroom' },
  { key: 'Dealership', label: 'Dealership' },
  { key: 'Mountain', label: 'Mountain' },
  { key: 'Coastal', label: 'Coastal' },
  { key: 'Urban', label: 'Urban' },
];

const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({
  selectedEnvironment,
  onEnvironmentChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-3">2. Choose an Environment</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {environmentOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onEnvironmentChange(key)}
            className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
              selectedEnvironment === key
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentSelector;