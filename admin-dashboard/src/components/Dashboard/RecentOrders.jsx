import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import Card from '../UI/Card';

const mockOrders = [
  {
    id: '1',
    customerName: 'Rajesh Sharma',
    items: 'Dal Bhat, Chicken Curry',
    total: 850,
    status: 'preparing',
    time: '10 mins ago',
    location: 'Kathmandu'
  },
  {
    id: '2',
    customerName: 'Sita Poudel',
    items: 'Momo, Chow Mein',
    total: 450,
    status: 'delivered',
    time: '25 mins ago',
    location: 'Lalitpur'
  },
  {
    id: '3',
    customerName: 'Ram Bahadur',
    items: 'Thukpa, Sel Roti',
    total: 320,
    status: 'pending',
    time: '1 hour ago',
    location: 'Bhaktapur'
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

export default function RecentOrders() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
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
        ))}
      </div>
    </Card>
  );
}