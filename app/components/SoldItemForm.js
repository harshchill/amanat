'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export function SoldItemForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPassword: '',
    productId: '',
    serialNumber: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/product');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage('Failed to load products');
      setMessageType('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (!formData.customerName.trim()) {
        throw new Error('Customer name is required');
      }
      if (!formData.customerEmail.trim()) {
        throw new Error('Customer email is required');
      }
      if (!formData.productId) {
        throw new Error('Please select a product');
      }
      if (!formData.serialNumber.trim()) {
        throw new Error('Serial number is required');
      }

      const res = await fetch('/api/solditem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          soldById: session?.user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create sold item');
      }

      setMessageType('success');
      setMessage('✓ Sale recorded successfully!');
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPassword: '',
        productId: '',
        serialNumber: '',
      });

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-2 mb-6">
          <Plus size={28} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Record New Sale</h2>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information Section */}
          <div className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Information
            </h3>

            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="customer@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Customer Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Password (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="customerPassword"
                    value={formData.customerPassword}
                    onChange={handleChange}
                    placeholder="Leave empty for auto-generated password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  If empty, a default password will be generated
                </p>
              </div>
            </div>
          </div>

          {/* Product & Serial Section */}
          <div className="border-l-4 border-green-600 pl-6 py-4 bg-green-50 rounded">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Details
            </h3>

            <div className="space-y-4">
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product *
                </label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required
                >
                  <option value="">-- Choose a product --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.modelNumber}) - {product.warrantyMonths}mo warranty
                    </option>
                  ))}
                </select>
              </div>

              {/* Serial Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number *
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  placeholder="Enter product serial number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition font-mono"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be unique - check the box before entering
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Plus size={20} />
                Record Sale
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
