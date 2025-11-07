import React from 'react';
import { AccessoryKey } from '../types';

interface AccessorySelectorProps {
  selectedAccessories: AccessoryKey[];
  onAccessoryToggle: (accessory: AccessoryKey) => void;
}

const accessoryOptions: { key: AccessoryKey; label: string }[] = [
  { key: 'RoofRack', label: 'Roof Rack' },
  { key: 'CustomWheels', label: 'Custom Wheels' },
  { key: 'WindowTint', label: 'Window Tint' },
  { key: 'BlackoutTrim', label: 'Blackout Trim' },
];

const AccessorySelector: React.FC<AccessorySelectorProps> = ({
  selectedAccessories,
  onAccessoryToggle,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-3">3. Add Accessories (Optional)</h2>
      <div className="grid grid-cols-2 gap-3">
        {accessoryOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onAccessoryToggle(key)}
            className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
              selectedAccessories.includes(key)
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

export default AccessorySelector;
