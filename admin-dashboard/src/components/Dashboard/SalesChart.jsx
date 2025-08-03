import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../UI/Card';
import { ordersAPI } from '../../services/api';

export default function SalesChart({ orders: totalOrders, revenue: totalRevenue }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateChartData();
  }, [totalOrders, totalRevenue]);

  const generateChartData = async () => {
    try {
      // For now, we'll generate mock data based on current totals
      // In a real app, you'd fetch historical data from your backend
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
      const data = months.map((month, index) => {
        const monthlyOrders = Math.floor((totalOrders || 100) * (0.8 + Math.random() * 0.4) / 7);
        const monthlySales = Math.floor((totalRevenue || 50000) * (0.8 + Math.random() * 0.4) / 7);
        return {
          name: month,
          sales: monthlySales,
          orders: monthlyOrders
        };
      });
      setChartData(data);
    } catch (error) {
      console.error('Error generating chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option>Last 7 months</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#f59532" 
              strokeWidth={3}
              dot={{ fill: '#f59532', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59532', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}