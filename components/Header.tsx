import React from 'react';
import { View } from '../types';
import { ICONS } from '../constants';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: View.Dashboard, label: 'Dashboard', icon: ICONS.dashboard },
    { view: View.Scanner, label: 'Scanner', icon: ICONS.camera },
    { view: View.Forecast, label: 'Forecast', icon: ICONS.chart },
    { view: View.Inventory, label: 'Inventory', icon: ICONS.database },
    { view: View.ShoppingList, label: 'Shopping List', icon: ICONS.shoppingCart },
  ];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Trackly
        </h1>
        <p className="text-slate-400 mt-1">Your AI-powered inventory manager.</p>
      </div>
      <nav className="bg-slate-800/60 p-2 rounded-lg backdrop-blur-sm">
        <ul className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => (
            <li key={item.view}>
              <button
                onClick={() => setCurrentView(item.view)}
                title={item.label}
                className={`flex items-center space-x-2 px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentView === item.view
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/80'
                }`}
                aria-current={currentView === item.view ? 'page' : undefined}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;