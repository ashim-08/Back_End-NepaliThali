import React, { useState } from 'react';
import Button from '../UI/Button';

export default function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    email: user?.email || '',
    contactNumber: user?.contactNumber || '',
    city: user?.city || '',
    street: user?.street || '',
    deliveryDescription: user?.deliveryDescription || '',
    role: user?.role || 'user',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!user && !formData.password.trim()) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Remove password if editing and it's empty
    const submitData = { ...formData };
    if (user && !submitData.password) {
      delete submitData.password;
    }

    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username *
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.userName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter username"
          />
          {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter contact number"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter city"
          />
        </div>

        {/* Street */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter street address"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password {!user && '*'}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={user ? "Leave blank to keep current password" : "Enter password"}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Delivery Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Description
        </label>
        <textarea
          name="deliveryDescription"
          value={formData.deliveryDescription}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter delivery instructions or description"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}