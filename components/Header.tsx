import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
        AI Car Staging <span className="text-blue-400">Pro</span>
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Batch process your vehicle images with custom branding.
      </p>
    </header>
  );
};

export default Header;