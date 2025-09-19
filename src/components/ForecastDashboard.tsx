import React, { useState, useCallback } from 'react';
// FIX: Import AllowedItemName to use in the ForecastResult interface.
import { InventoryItem, AllowedItemName } from '../types';
import { generateForecast } from '../services/geminiService';
import Card from './common/Card';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { ICONS } from '../constants';

interface ForecastDashboardProps {
  inventory: InventoryItem[];
  onInventoryUpdate: (updatedItems: Partial<InventoryItem>[]) => void;
}

interface ForecastResult {
    // FIX: Change type from string to AllowedItemName to match service response.
    name: AllowedItemName;
    usageRate: string;
    reorderDate: string;
}

const ForecastDashboard: React.FC<ForecastDashboardProps> = ({ inventory, onInventoryUpdate }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [forecasts, setForecasts] = useState<ForecastResult[] | null>(null);

  const handleGenerateForecast = useCallback(async () => {
    if (inventory.length === 0) {
      setError("Your inventory is empty. Please scan or add some items first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setForecasts(null);

    try {
      const itemNames = inventory.map(item => item.name);
      const forecastResults = await generateForecast(itemNames);
      setForecasts(forecastResults);
      onInventoryUpdate(forecastResults);
    } catch (err) {
      setError("Failed to generate forecast. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inventory, onInventoryUpdate]);

  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Consumption Forecast</h2>
        <p className="text-slate-400 mt-2">Let the AI predict your usage patterns and suggest when to reorder.</p>
      </div>

      <div className="mt-6 text-center">
        <Button onClick={handleGenerateForecast} disabled={isLoading || inventory.length === 0}>
          {isLoading ? <Spinner /> : (
            <div className="flex items-center">
                {ICONS.magic}
                <span>Generate Forecast</span>
            </div>
          )}
        </Button>
      </div>
       {inventory.length === 0 && <p className="text-yellow-400 text-center mt-4">Add items via the Inventory page to enable forecasting.</p>}
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {forecasts && (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-white text-center mb-4">Forecast Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forecasts.map((forecast, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-indigo-500 transition-all">
                        <p className="text-lg font-bold text-white">{forecast.name}</p>
                        <div className="mt-2 space-y-1 text-sm">
                            <p className="text-slate-300"><span className="font-semibold text-slate-400">Usage Rate:</span> {forecast.usageRate}</p>
                            <p className="text-slate-300"><span className="font-semibold text-slate-400">Reorder By:</span> <span className="text-purple-400 font-medium">{forecast.reorderDate}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

    </Card>
  );
};

export default ForecastDashboard;
