import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import Card from '../UI/Card';
import { ordersAPI } from '../../services/api';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-blue-100 text-blue-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      const allOrders = response.data.data || [];
      // Get the 5 most recent orders
      const recentOrders = allOrders
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5)
        .map(order => ({
          id: order._id,
          customerName: order.cName || 'Unknown Customer',
          items: order.items?.itemName || 'No items',
          total: order.totalAmount || 0,
          status: order.status || 'pending',
          time: getTimeAgo(order.createdAt),
          location: order.street || 'Unknown'
        }));
      setOrders(recentOrders);
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown time';
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - orderDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No recent orders</p>
          </div>
        ) : (
          orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{order.customerName}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{order.items}</p>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {order.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {order.location}
                </div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <p className="font-semibold text-gray-900">Rs. {order.total}</p>
            </div>
          </div>
          ))
        )}
      </div>
    </Card>
  );
}