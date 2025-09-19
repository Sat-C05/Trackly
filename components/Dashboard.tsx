import React from 'react';
import { InventoryItem, View } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { ICONS } from '../constants';

interface DashboardProps {
  inventory: InventoryItem[];
  shoppingListCount: number;
  setCurrentView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ inventory, shoppingListCount, setCurrentView }) => {
  const statusCounts = inventory.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<InventoryItem['status'], number>);

  const itemsNeedingAttention = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-indigo-400 opacity-80">{ICONS.dashboard}</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome to Trackly</h2>
              <p className="text-slate-400">Here's a quick look at your home inventory.</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4">Inventory Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-3xl font-bold text-green-400">{statusCounts['In Stock'] || 0}</p>
              <p className="text-sm text-slate-400">In Stock</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">{statusCounts['Low Stock'] || 0}</p>
              <p className="text-sm text-slate-400">Low Stock</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg col-span-2 md:col-span-1">
              <p className="text-3xl font-bold text-red-400">{statusCounts['Out of Stock'] || 0}</p>
              <p className="text-sm text-slate-400">Out of Stock</p>
            </div>
          </div>
        </Card>

        {itemsNeedingAttention.length > 0 && (
          <Card>
            <h3 className="text-xl font-semibold text-white mb-4">Items Needing Attention</h3>
            <ul className="space-y-3">
              {itemsNeedingAttention.map(item => (
                <li key={item.id} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg">
                  <span className="font-medium text-white">{item.name}</span>
                  <div className="flex items-center space-x-2">
                     <div className={`h-2.5 w-2.5 rounded-full ${item.status === 'Low Stock' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                    <span className={`text-sm font-semibold ${item.status === 'Low Stock' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {item.status} (Qty: {item.quantity})
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <Card className="flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-col space-y-3 w-full">
            <Button onClick={() => setCurrentView(View.Scanner)}>Scan New Items</Button>
            <Button onClick={() => setCurrentView(View.Inventory)}>Manage Inventory</Button>
          </div>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Shopping List</h3>
          <p className="text-5xl font-bold text-purple-400 my-2">{shoppingListCount}</p>
          <p className="text-slate-400 mb-4">items to buy</p>
          <Button onClick={() => setCurrentView(View.ShoppingList)} disabled={shoppingListCount === 0}>
            View List
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;