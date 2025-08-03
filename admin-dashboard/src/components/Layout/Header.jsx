import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

export default function Header({ title, onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-xs lg:text-sm text-gray-500 mt-1 hidden sm:block">
            Welcome back! Here's what's happening with your restaurant today.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <button className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}