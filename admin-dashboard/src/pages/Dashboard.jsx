import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import SalesChart from '../components/Dashboard/SalesChart';
import RecentOrders from '../components/Dashboard/RecentOrders';
import { productsAPI, ordersAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    activeUsers: 0,
    revenueChange: 0,
    ordersChange: 0,
    productsChange: 0,
    usersChange: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll()
      ]);

      const products = productsRes.data.data || [];
      const orders = ordersRes.data.data || [];

      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        activeUsers: new Set(orders.map(order => order.cName)).size,
        revenueChange: Math.random() * 20 - 10, // Mock change data
        ordersChange: Math.random() * 20 - 10,
        productsChange: Math.random() * 20 - 10,
        usersChange: Math.random() * 20 - 10
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Revenue"
          value={`Rs. ${stats.totalRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={DollarSign}
          color="primary"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change={stats.ordersChange}
          icon={ShoppingCart}
          color="blue"
        />
        <StatsCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          change={stats.productsChange}
          icon={Package}
          color="secondary"
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers.toString()}
          change={stats.usersChange}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <SalesChart orders={stats.totalOrders} revenue={stats.totalRevenue} />
        <RecentOrders />
      </div>
    </div>
  );
}