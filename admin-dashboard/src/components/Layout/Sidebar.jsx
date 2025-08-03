import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  ChefHat,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ currentPath, onNavigate, onLogout, onClose }) {
  return (
    <div className="flex flex-col h-full bg-white shadow-xl border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-8 border-b border-gray-200">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden absolute top-4 right-4"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-500 rounded-xl">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">NepaliThali</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.href)}
              className={cn(
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn(
                'w-5 h-5 mr-3',
                isActive ? 'text-primary-600' : 'text-gray-400'
              )} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}