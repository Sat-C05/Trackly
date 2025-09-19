import React, { useState, useCallback, useMemo } from 'react';
import { View, InventoryItem, AllowedItemName } from './types';
import Header from './components/Header';
import InventoryScanner from './components/InventoryScanner';
import ForecastDashboard from './components/ForecastDashboard';
import InventoryList from './components/InventoryList';
import Dashboard from './components/Dashboard';
import ShoppingList from './components/ShoppingList';
import { ALLOWED_ITEMS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const updateInventoryWithStatus = useCallback((items: InventoryItem[]) => {
    const updatedItems = items.map(item => ({
      ...item,
      // FIX: Cast status to the correct type to resolve type inference issue.
      status: (item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 2 ? 'Low Stock' : 'In Stock') as InventoryItem['status']
    })).sort((a, b) => a.name.localeCompare(b.name));
    setInventory(updatedItems);
  }, []);

  const handleInventoryUpdate = useCallback((newItems: Partial<InventoryItem>[]) => {
    setInventory(prevInventory => {
      const updatedInventory = [...prevInventory];
      newItems.forEach(newItem => {
        if (!newItem.name || !ALLOWED_ITEMS.includes(newItem.name as AllowedItemName)) return;

        const existingItemIndex = updatedInventory.findIndex(item => item.name.toLowerCase() === newItem.name?.toLowerCase());
        if (existingItemIndex !== -1) {
          updatedInventory[existingItemIndex] = { ...updatedInventory[existingItemIndex], ...newItem };
        } else {
          updatedInventory.push({
            id: `${newItem.name}-${Date.now()}`,
            name: newItem.name as AllowedItemName,
            quantity: newItem.quantity ?? 1,
            status: 'In Stock',
            usageRate: newItem.usageRate ?? 'N/A',
            reorderDate: newItem.reorderDate ?? 'N/A',
          });
        }
      });
      
      const itemsWithStatus = updatedInventory.map(item => ({
        ...item,
        // FIX: Cast status to the correct type to resolve type inference issue.
        status: (item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 2 ? 'Low Stock' : 'In Stock') as InventoryItem['status']
      }));

      return itemsWithStatus.sort((a,b) => a.name.localeCompare(b.name));
    });
  }, []);

  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    setInventory(prev => {
      const updated = prev.map(item => 
        item.id === itemId ? { ...item, quantity: Math.max(0, newQuantity) } : item
      );
      // FIX: Cast status to the correct type to resolve type inference issue.
      return updated.map(item => ({
        ...item,
        status: (item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 2 ? 'Low Stock' : 'In Stock') as InventoryItem['status']
      }));
    });
  }, []);

  const handleAddItem = useCallback((itemName: AllowedItemName) => {
    const newItem: Partial<InventoryItem> = {
      name: itemName,
      quantity: 1,
    };
    handleInventoryUpdate([newItem]);
  }, [handleInventoryUpdate]);

  const handlePurchaseItems = useCallback((itemNames: AllowedItemName[]) => {
     setInventory(prev => {
      const updated = prev.map(item => 
        itemNames.includes(item.name) ? { ...item, quantity: item.quantity + 5 } : item // Restock with 5 units
      );
      // FIX: Cast status to the correct type to resolve type inference issue.
      return updated.map(item => ({
        ...item,
        status: (item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 2 ? 'Low Stock' : 'In Stock') as InventoryItem['status']
      }));
    });
  }, []);

  const shoppingListItems = useMemo(() => 
    inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock'),
  [inventory]);

  const renderCurrentView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard inventory={inventory} shoppingListCount={shoppingListItems.length} setCurrentView={setCurrentView} />;
      case View.Scanner:
        return <InventoryScanner onInventoryUpdate={handleInventoryUpdate} />;
      case View.Forecast:
        return <ForecastDashboard inventory={inventory} onInventoryUpdate={handleInventoryUpdate} />;
      case View.Inventory:
        return <InventoryList inventory={inventory} onQuantityChange={handleQuantityChange} onAddItem={handleAddItem} />;
      case View.ShoppingList:
        return <ShoppingList items={shoppingListItems} onPurchase={handlePurchaseItems} />;
      default:
        return <Dashboard inventory={inventory} shoppingListCount={shoppingListItems.length} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-purple-900/30 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <main className="mt-8">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default App;
