import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import Card from '../components/UI/Card';

// Mock data - replace with actual API call
const mockUsers = [
  {
    id: '1',
    userName: 'rajesh_sharma',
    email: 'rajesh@example.com',
    contactNumber: '+977-9841234567',
    city: 'Kathmandu',
    street: 'Thamel, Ward 29',
    role: 'user',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20',
    totalOrders: 12,
    totalSpent: 8450
  },
  {
    id: '2',
    userName: 'sita_poudel',
    email: 'sita@example.com',
    contactNumber: '+977-9851234567',
    city: 'Lalitpur',
    street: 'Patan Durbar Square',
    role: 'user',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-19',
    totalOrders: 8,
    totalSpent: 3200
  },
  {
    id: '3',
    userName: 'admin_user',
    email: 'admin@nepalithali.com',
    contactNumber: '+977-9861234567',
    city: 'Kathmandu',
    street: 'New Baneshwor',
    role: 'admin',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20',
    totalOrders: 0,
    totalSpent: 0
  },
];

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.contactNumber.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {user.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.userName}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      <Shield className="w-3 h-3 inline mr-1" />
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {user.email}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {user.contactNumber}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {user.street}, {user.city}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>

            {user.role === 'user' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">{user.totalOrders}</p>
                    <p className="text-xs text-gray-500">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary-600">Rs. {user.totalSpent}</p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
              Last login: {new Date(user.lastLogin).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">
            {searchTerm || roleFilter !== 'all' ? 'Try adjusting your search or filters' : 'No users have registered yet'}
          </p>
        </div>
      )}
    </div>
  );
}