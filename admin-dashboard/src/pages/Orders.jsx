import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Phone, Eye } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { ordersAPI } from '../services/api';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  preparing: 'bg-blue-100 text-blue-800 border-blue-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ordersAPI.update({ id: orderId, status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.cName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.contactNumber?.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order._id} className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-gray-900">{order.cName || 'N/A'}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Phone className="w-3 h-3 mr-1" />
                    {order.contactNumber || 'N/A'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {order.street || 'N/A'}
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <p className="font-medium text-gray-900">Order Items</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.items?.itemName || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {order.items?.quantity || 'N/A'}
                  </p>
                </div>

                {/* Amount */}
                <div>
                  <p className="font-medium text-gray-900">Total Amount</p>
                  <p className="text-lg font-bold text-primary-600 mt-1">
                    Rs. {order.totalAmount || 0}
                  </p>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[order.status] || statusColors.pending}`}>
                      {order.status || 'pending'}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <select
                      value={order.status || 'pending'}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'No orders have been placed yet'}
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedOrder.cName || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.contactNumber || 'N/A'}</p>
                  <p><span className="font-medium">Address:</span> {selectedOrder.street || 'N/A'}</p>
                  <p><span className="font-medium">Delivery Notes:</span> {selectedOrder.deliveryDescription || 'None'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Order Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Items:</span> {selectedOrder.items?.itemName || 'N/A'}</p>
                  <p><span className="font-medium">Quantity:</span> {selectedOrder.items?.quantity || 'N/A'}</p>
                  <p><span className="font-medium">Total Amount:</span> Rs. {selectedOrder.totalAmount || 0}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusColors[selectedOrder.status] || statusColors.pending}`}>
                      {selectedOrder.status || 'pending'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}