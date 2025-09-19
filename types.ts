export enum View {
  Dashboard = 'dashboard',
  Scanner = 'scanner',
  Forecast = 'forecast',
  Inventory = 'inventory',
  ShoppingList = 'shoppingList',
}

export type AllowedItemName = 'Rice' | 'Milk' | 'Eggs' | 'Oil' | 'Bread';

export interface InventoryItem {
  id: string;
  name: AllowedItemName;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  usageRate: string;
  reorderDate: string;
}