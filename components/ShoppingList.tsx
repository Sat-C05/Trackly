import React, { useState } from 'react';
import { InventoryItem, AllowedItemName } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { ICONS } from '../constants';

interface ShoppingListProps {
  items: InventoryItem[];
  onPurchase: (itemNames: AllowedItemName[]) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onPurchase }) => {
  const [checkedItems, setCheckedItems] = useState<Set<AllowedItemName>>(new Set());

  const handleToggle = (itemName: AllowedItemName) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };
  
  const handleSelectAll = () => {
    if(checkedItems.size === items.length){
        setCheckedItems(new Set());
    } else {
        setCheckedItems(new Set(items.map(item => item.name)));
    }
  }

  const handlePurchase = () => {
    onPurchase(Array.from(checkedItems));
    setCheckedItems(new Set());
  };

  return (
    <Card>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Shopping List</h2>
        <p className="text-slate-400 mt-2">Items that are low or out of stock.</p>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
            {ICONS.celebrate}
            <h3 className="mt-4 text-lg font-medium text-white">All Caught Up!</h3>
            <p className="mt-1 text-sm text-slate-400">
                Your shopping list is empty. Great job staying stocked!
            </p>
        </div>
      ) : (
        <div>
          <ul className="space-y-3">
            {items.map(item => (
              <li key={item.id} className="flex items-center bg-slate-800/50 p-4 rounded-lg transition-colors hover:bg-slate-800">
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={checkedItems.has(item.name)}
                  onChange={() => handleToggle(item.name)}
                  className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor={`item-${item.id}`} className="ml-3 block text-white font-medium flex-grow cursor-pointer">
                  {item.name}
                </label>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                    item.status === 'Low Stock' 
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                    {item.status}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button onClick={handleSelectAll}>
                {checkedItems.size === items.length ? 'Deselect All' : 'Select All'}
            </Button>
            <Button onClick={handlePurchase} disabled={checkedItems.size === 0}>
              Mark {checkedItems.size} {checkedItems.size === 1 ? 'Item' : 'Items'} as Purchased
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ShoppingList;