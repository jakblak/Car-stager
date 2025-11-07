import { GoogleGenAI, Modality, Part } from "@google/genai";
import { Accessory, AccessoryKey } from '../types';

interface GenerationOptions {
    logoFile?: File | null;
    bannerText?: string;
    customPrompt?: string;
    accessories?: AccessoryKey[];
}

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateStagedImage = async (
    imageFile: File,
    environmentPrompt: string,
    options: GenerationOptions
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const carImagePart = await fileToGenerativePart(imageFile);
  
  let prompt = `Your task is to place the car from the provided image into a new, photorealistic background: ${environmentPrompt}. Your highest priority is to preserve the car in its original state without any modifications. The car's body, shape, paint, and condition must be identical to the source image. This includes all existing defects: do not remove scratches, do not fix dents, do not repair sun spots or any other signs of wear. The final image should look like the original car was photographed in the new location. Adjust only the lighting, shadows, and reflections on the car to seamlessly match the new environment. Do not add text unless specified.`;

  if (options.accessories && options.accessories.length > 0) {
    const accessoryDescriptions = options.accessories.map(key => Accessory[key]);
    prompt += ` Additionally, add the following accessories to the car, ensuring they are placed in a physically accurate manner and match the car's lighting, perspective, and style: ${accessoryDescriptions.join(', ')}.`;
  }

  const parts: Part[] = [carImagePart];

  if (options.logoFile) {
    const logoImagePart = await fileToGenerativePart(options.logoFile);
    parts.push(logoImagePart);
    prompt += ` The second image provided is a logo. Place this logo as a tasteful, semi-transparent watermark in the bottom-right corner of the final image.`;
  }

  if (options.bannerText && options.bannerText.trim() !== '') {
    prompt += ` At the bottom of the image, add a sleek, modern, semi-transparent black banner that spans the width. On this banner, display the text "${options.bannerText}" in a clean, bold, white sans-serif font.`;
  }
  
  if (options.customPrompt && options.customPrompt.trim() !== '') {
    prompt += ` Additional instructions: ${options.customPrompt}.`;
  }

  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: parts,
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      const mimeType = part.inlineData.mimeType;
      return `data:${mimeType};base64,${base64ImageBytes}`;
    }
  }

  throw new Error("No image was generated in the response.");
};