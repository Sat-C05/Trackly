import React, { useState, useCallback } from 'react';
import { identifyItemsInImage } from '../services/geminiService';
import Card from './common/Card';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { InventoryItem, AllowedItemName } from '../types';
import { ICONS, ITEM_ICONS } from '../constants';

interface InventoryScannerProps {
  onInventoryUpdate: (newItems: Partial<InventoryItem>[]) => void;
}

const InventoryScanner: React.FC<InventoryScannerProps> = ({ onInventoryUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<{name: AllowedItemName, quantity: number}[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setScannedItems([]);
      setError(null);
    }
  };

  const handleScan = useCallback(async () => {
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setScannedItems([]);

    try {
      const items = await identifyItemsInImage(selectedFile);
      if (items.length === 0) {
        setError("Could not identify any of the allowed items in the image.");
      } else {
        setScannedItems(items);
        onInventoryUpdate(items);
      }
    } catch (err) {
      setError("Failed to scan image. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, onInventoryUpdate]);

  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Inventory Vision Scanner</h2>
        <p className="text-slate-400 mt-2">Upload a picture of your pantry or fridge to automatically update your inventory.</p>
      </div>

      <div className="mt-6 flex flex-col items-center">
        {!previewUrl ? (
            <label htmlFor="file-upload" className="relative block w-full rounded-lg border-2 border-dashed border-slate-600 p-12 text-center hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer">
                {ICONS.placeholder}
                <span className="mt-2 block text-sm font-medium text-slate-300">
                    Drag & drop an image, or click to upload
                </span>
                <input id="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
            </label>
        ) : (
            <div className="mt-6 flex flex-col items-center justify-center">
                <img src={previewUrl} alt="Inventory preview" className="max-h-64 rounded-lg shadow-lg border-2 border-slate-700" />
                 <label htmlFor="file-upload" className="mt-4 cursor-pointer bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors">
                    {ICONS.upload}
                    <span>Change Image</span>
                </label>
                 <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <Button onClick={handleScan} disabled={!selectedFile || isLoading}>
          {isLoading ? <Spinner /> : 'Scan Inventory'}
        </Button>
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {scannedItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white text-center">Scan Results</h3>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {scannedItems.map((item, index) => (
              <li key={index} className="bg-slate-800/50 p-4 rounded-lg text-center border border-slate-700 flex flex-col items-center justify-center space-y-2">
                {ITEM_ICONS[item.name]}
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-slate-400 text-sm">Qty: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default InventoryScanner;