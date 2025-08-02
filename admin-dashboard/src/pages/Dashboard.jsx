import React from 'react';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import SalesChart from '../components/Dashboard/SalesChart';
import RecentOrders from '../components/Dashboard/RecentOrders';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="Rs. 2,45,680"
          change={12.5}
          icon={DollarSign}
          color="primary"
        />
        <StatsCard
          title="Total Orders"
          value="1,247"
          change={8.2}
          icon={ShoppingCart}
          color="blue"
        />
        <StatsCard
          title="Total Products"
          value="156"
          change={-2.1}
          icon={Package}
          color="secondary"
        />
        <StatsCard
          title="Active Users"
          value="892"
          change={15.3}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
}