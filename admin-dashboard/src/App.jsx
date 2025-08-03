import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Settings from './pages/Settings';

const routes = {
  '/': { component: Dashboard, title: 'Dashboard' },
  '/products': { component: Products, title: 'Products' },
  '/orders': { component: Orders, title: 'Orders' },
  '/users': { component: Users, title: 'Users' },
  '/settings': { component: Settings, title: 'Settings' },
};

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (path) => {
    setCurrentPath(path);
    // Refresh the component when navigating
    setRefreshKey(prev => prev + 1);
    // Close sidebar on mobile after navigation
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    // Redirect to login or refresh
    window.location.reload();
  };

  const CurrentComponent = routes[currentPath]?.component || Dashboard;
  const currentTitle = routes[currentPath]?.title || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar 
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={currentTitle} 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <CurrentComponent key={refreshKey} />
        </main>
      </div>
    </div>
  );
}

export default App;