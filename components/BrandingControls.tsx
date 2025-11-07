import React, { useState, useCallback } from 'react';

interface BrandingControlsProps {
  onLogoUpload: (file: File | null) => void;
  bannerText: string;
  onBannerTextChange: (text: string) => void;
}

const BrandingControls: React.FC<BrandingControlsProps> = ({ onLogoUpload, bannerText, onBannerTextChange }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      onLogoUpload(file);
      setLogoPreview(URL.createObjectURL(file));
    } else {
        onLogoUpload(null);
        setLogoPreview(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-200">4. Add Branding (Optional)</h2>
      
      {/* Logo Uploader */}
      <div>
        <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-300 mb-1">Dealership Logo</label>
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center">
                {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                ) : (
                    <span className="text-gray-400 text-xs text-center">No Logo</span>
                )}
            </div>
            <label htmlFor="logo-upload" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                Upload Logo
            </label>
            {logoPreview && (
                <button onClick={() => handleLogoChange(null)} className="text-red-400 text-sm hover:underline">Remove</button>
            )}
        </div>
        <input
            id="logo-upload"
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => handleLogoChange(e.target.files)}
        />
      </div>

      {/* Banner Text */}
      <div>
        <label htmlFor="banner-text" className="block text-sm font-medium text-gray-300 mb-1">Promotional Banner</label>
        <input
          id="banner-text"
          type="text"
          value={bannerText}
          onChange={(e) => onBannerTextChange(e.target.value)}
          placeholder="e.g., SUMMER SALE EVENT"
          className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default BrandingControls;