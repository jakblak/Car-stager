import React, { useState, useCallback } from 'react';
import { Environment, EnvironmentKey, AccessoryKey } from './types';
import Header from './components/Header';
import MultiImageUploader from './components/MultiImageUploader';
import EnvironmentSelector from './components/EnvironmentSelector';
import AccessorySelector from './components/AccessorySelector';
import BrandingControls from './components/BrandingControls';
import AdvancedOptions from './components/AdvancedOptions';
import ResultsGrid from './components/ResultsGrid';
import Loader from './components/Loader';
import { generateStagedImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImages, setOriginalImages] = useState<File[]>([]);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [bannerText, setBannerText] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [selectedAccessories, setSelectedAccessories] = useState<AccessoryKey[]>([]);
  const [generatedImageUrls, setGeneratedImageUrls] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentKey>('Showroom');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const handleImagesUpload = (files: File[]) => {
    setOriginalImages(files);
    setGeneratedImageUrls([]);
    setError(null);
  };

  const handleLogoUpload = (file: File | null) => {
    setLogoImage(file);
  };
  
  const handleAccessoryToggle = (accessory: AccessoryKey) => {
    setSelectedAccessories(prev =>
      prev.includes(accessory)
        ? prev.filter(a => a !== accessory)
        : [...prev, accessory]
    );
  };

  const handleGenerateBatch = useCallback(async () => {
    if (originalImages.length === 0) {
      setError("Please upload at least one car image.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrls([]);
    setProgress({ current: 1, total: originalImages.length });

    const newImageUrls: string[] = [];
    try {
      const environmentPrompt = Environment[selectedEnvironment];
      for (let i = 0; i < originalImages.length; i++) {
        const file = originalImages[i];
        setProgress({ current: i + 1, total: originalImages.length });
        const resultImageUrl = await generateStagedImage(file, environmentPrompt, {
          logoFile: logoImage,
          bannerText: bannerText,
          customPrompt: customPrompt,
          accessories: selectedAccessories,
        });
        newImageUrls.push(resultImageUrl);
      }
      setGeneratedImageUrls(newImageUrls);
    } catch (e) {
      console.error(e);
      setError("Failed to generate images. Please check the console and try again.");
    } finally {
      setIsLoading(false);
      setProgress(null);
    }
  }, [originalImages, selectedEnvironment, logoImage, bannerText, customPrompt, selectedAccessories]);

  const canGenerate = originalImages.length > 0 && !isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls Column */}
            <div className="lg:col-span-4 w-full flex flex-col gap-6 p-6 bg-gray-800 rounded-xl shadow-2xl">
              <MultiImageUploader onImagesUpload={handleImagesUpload} />
              <EnvironmentSelector
                selectedEnvironment={selectedEnvironment}
                onEnvironmentChange={setSelectedEnvironment}
              />
              <AccessorySelector 
                selectedAccessories={selectedAccessories}
                onAccessoryToggle={handleAccessoryToggle}
              />
              <BrandingControls 
                onLogoUpload={handleLogoUpload}
                bannerText={bannerText}
                onBannerTextChange={setBannerText}
              />
              <AdvancedOptions 
                customPrompt={customPrompt}
                onCustomPromptChange={setCustomPrompt}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-200 mb-3">6. Generate Batch</h2>
                <button
                  onClick={handleGenerateBatch}
                  disabled={!canGenerate}
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                >
                  {isLoading ? `Processing ${progress?.current}/${progress?.total}...` : `Generate ${originalImages.length} Images`}
                </button>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-8 w-full flex flex-col justify-center items-center p-6 bg-gray-800 rounded-xl shadow-2xl min-h-[600px]">
              {isLoading ? (
                <Loader current={progress?.current} total={progress?.total} />
              ) : error ? (
                <div className="text-center text-red-400">
                  <p className="font-bold">An Error Occurred</p>
                  <p>{error}</p>
                </div>
              ) : generatedImageUrls.length > 0 ? (
                <ResultsGrid imageUrls={generatedImageUrls} />
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-xl font-medium">Your staged images will appear here.</p>
                  <p className="mt-2">Upload photos, choose your settings, and click Generate.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;