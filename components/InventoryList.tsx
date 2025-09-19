import React, { useState, useMemo } from 'react';
import { InventoryItem, AllowedItemName } from '../types';
import Card from './common/Card';
import { ICONS, ALLOWED_ITEMS, ITEM_ICONS } from '../constants';
import Button from './common/Button';

interface InventoryListProps {
  inventory: InventoryItem[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onAddItem: (itemName: AllowedItemName) => void;
}

const statusColors: { [key in InventoryItem['status']]: string } = {
  'In Stock': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Low Stock': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Out of Stock': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const AddItemForm: React.FC<{ onAddItem: (itemName: AllowedItemName) => void; existingItems: AllowedItemName[] }> = ({ onAddItem, existingItems }) => {
  const [selectedItem, setSelectedItem] = useState<AllowedItemName | ''>('');
  
  const availableItems = useMemo(() => 
    ALLOWED_ITEMS.filter(item => !existingItems.includes(item)), 
    [existingItems]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      onAddItem(selectedItem);
      setSelectedItem('');
    }
  };

  if (availableItems.length === 0) {
    return <p className="text-center text-slate-400 mt-4 text-sm">All available items have been added.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 mt-4">
      <select 
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value as AllowedItemName)}
        className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
      >
        <option value="" disabled>Choose an item</option>
        {availableItems.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
      <Button type="submit" disabled={!selectedItem}>Add Item</Button>
    </form>
  )
};

const InventoryList: React.FC<InventoryListProps> = ({ inventory, onQuantityChange, onAddItem }) => {
  const existingItemNames = useMemo(() => inventory.map(item => item.name), [inventory]);

  return (
    <Card>
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white">Inventory Database</h2>
        <p className="text-slate-400 mt-2">A complete overview of all your household items.</p>
      </div>

      <AddItemForm onAddItem={onAddItem} existingItems={existingItemNames} />

      {inventory.length === 0 ? (
        <div className="text-center py-16">
            {ICONS.database}
            <p className="mt-4 text-slate-400">
                Your inventory is empty.
            </p>
             <p className="text-sm text-slate-500">
                Use the form above or the 'Vision Scanner' to add items.
            </p>
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Item Name</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usage Rate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Reorder Date</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900/50 divide-y divide-slate-800">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      <div className="flex items-center space-x-3">
                        {ITEM_ICONS[item.name]}
                        <span>{item.name}</span>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <div className="flex items-center justify-center gap-2">
                       <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors" aria-label={`Decrease quantity of ${item.name}`}>{ICONS.minus}</button>
                       <span className="w-8 text-center font-bold">{item.quantity}</span>
                       <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors" aria-label={`Increase quantity of ${item.name}`}>{ICONS.plus}</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.usageRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400 font-medium">{item.reorderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default InventoryList;