import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ALLOWED_ITEMS } from '../constants';
import { AllowedItemName } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (file: File) => {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const normalizeItemName = (name: string): AllowedItemName | null => {
  const lowerCaseName = name.toLowerCase().trim();
  for (const allowedItem of ALLOWED_ITEMS) {
    if (lowerCaseName.includes(allowedItem.toLowerCase())) {
      return allowedItem;
    }
  }
  return null;
};

export const identifyItemsInImage = async (imageFile: File): Promise<{name: AllowedItemName, quantity: number}[]> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    const textPart = {
      text: `From the following list of items: ${ALLOWED_ITEMS.join(', ')}. Identify which ones are in the image. For each item found, estimate a plausible integer quantity. Ignore any other items not on the list. Return the result as a JSON array of objects with "name" and "quantity" keys.`,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: `The name of the item, must be one of: ${ALLOWED_ITEMS.join(', ')}.`,
              },
              quantity: {
                type: Type.INTEGER,
                description: 'The estimated integer count of the item.',
              },
            },
            required: ["name", "quantity"],
          },
        },
      },
    });

    const jsonString = response.text;
    const parsedItems: {name: string, quantity: number}[] = JSON.parse(jsonString);

    // Filter and normalize results to ensure they match the allowed items list
    const filteredItems = parsedItems
      .map(item => ({...item, name: normalizeItemName(item.name)}))
      .filter(item => item.name !== null) as {name: AllowedItemName, quantity: number}[];

    // Aggregate quantities for items that might be duplicated (e.g., "Milk" and "Carton of Milk")
    const aggregatedItems = new Map<AllowedItemName, number>();
    for (const item of filteredItems) {
        aggregatedItems.set(item.name, (aggregatedItems.get(item.name) || 0) + item.quantity);
    }

    return Array.from(aggregatedItems, ([name, quantity]) => ({ name, quantity }));

  } catch (error) {
    console.error("Error identifying items in image:", error);
    throw new Error("Failed to analyze image with Gemini API.");
  }
};

// FIX: Update function signature and implementation to return the correct type and ensure type safety.
export const generateForecast = async (itemNames: string[]): Promise<{name: AllowedItemName, usageRate: string, reorderDate: string}[]> => {
    if (itemNames.length === 0) {
        return [];
    }
    
    try {
        const prompt = `For the following list of household items: ${itemNames.join(", ")}. Generate a plausible consumption forecast. For each item, predict a 'usageRate' (e.g., '1 unit every 5 days') and a 'reorderDate' based on today's date, which is ${new Date().toLocaleDateString()}. Assume a starting quantity of 3-5 units for each. Return a JSON array.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                 type: Type.ARRAY,
                 items: {
                   type: Type.OBJECT,
                   properties: {
                     name: {
                       type: Type.STRING,
                       description: `The name of the item. Must be one of: ${ALLOWED_ITEMS.join(', ')}.`,
                     },
                     usageRate: {
                       type: Type.STRING,
                       description: 'The predicted usage rate (e.g., "1 unit every 3 days").',
                     },
                     reorderDate: {
                       type: Type.STRING,
                       description: 'The predicted reorder date (e.g., "YYYY-MM-DD").',
                     }
                   },
                   required: ["name", "usageRate", "reorderDate"],
                 },
               },
            },
        });
        
        const jsonString = response.text;
        const parsedItems: {name: string, usageRate: string, reorderDate: string}[] = JSON.parse(jsonString);

        return parsedItems
          .map(item => ({...item, name: normalizeItemName(item.name)}))
          .filter((item): item is { name: AllowedItemName; usageRate: string; reorderDate: string } => item.name !== null);

    } catch (error) {
        console.error("Error generating forecast:", error);
        throw new Error("Failed to generate forecast with Gemini API.");
    }
};
