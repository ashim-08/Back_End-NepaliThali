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

  const handleNavigate = (path) => {
    setCurrentPath(path);
    // Refresh the component when navigating
    setRefreshKey(prev => prev + 1);
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
      <div className="w-64 flex-shrink-0">
        <Sidebar 
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentTitle} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <CurrentComponent key={refreshKey} />
        </main>
      </div>
    </div>
  );
}

export default App;