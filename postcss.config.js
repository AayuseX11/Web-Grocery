import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Heart, Star, Search, Filter, Plus, Minus, X, Check, MapPin,
  Truck, Clock, Phone, Mail, CreditCard, Wallet, Gift, Tag, TrendingUp,
  Users, Package, Award, ChevronDown, ChevronRight, Eye, ArrowRight,
  Leaf, Shield, Menu, User, ShoppingBag
} from 'lucide-react';

const PRODUCT_DATABASE = [
  {
    id: 'veg_001',
    name: 'Fresh Spinach',
    category: 'Vegetables',
    price: 100,
    originalPrice: 100,
    priceUnit: '/bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
    discount: 0,
    stock: 45,
    organic: false,
    rating: 4.5,
    reviews: 125
  },
  {
    id: 'grain_001',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 180,
    originalPrice: 180,
    priceUnit: '/kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    discount: 0,
    stock: 67,
    organic: false,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 'veg_002',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 60,
    originalPrice: 80,
    priceUnit: '/kg',
    image: 'https://images.unsplash.com/photo-1546470427-e2e5b8d47c83?w=400&h=300&fit=crop',
    discount: 25,
    stock: 28,
    organic: true,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 'oil_001',
    name: 'Mustard Oil',
    category: 'Oils',
    price: 220,
    originalPrice: 220,
    priceUnit: '/ltr',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
    discount: 0,
    stock: 34,
    organic: false,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 'veg_003',
    name: 'Fresh Potatoes',
    category: 'Vegetables',
    price: 40,
    originalPrice: 50,
    priceUnit: '/kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
    discount: 10,
    stock: 78,
    organic: false,
    rating: 4.2,
    reviews: 67
  },
  {
    id: 'dairy_001',
    name: 'Fresh Milk',
    category: 'Dairy',
    price: 55,
    originalPrice: 55,
    priceUnit: '/ltr',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    discount: 0,
    stock: 45,
    organic: true,
    rating: 4.7,
    reviews: 198
  },
  {
    id: 'grain_002',
    name: 'Wheat Flour',
    category: 'Grains',
    price: 45,
    originalPrice: 50,
    priceUnit: '/kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    discount: 10,
    stock: 56,
    organic: false,
    rating: 4.4,
    reviews: 145
  },
  {
    id: 'bev_001',
    name: 'Green Tea',
    category: 'Beverages',
    price: 150,
    originalPrice: 150,
    priceUnit: '/pack',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    discount: 0,
    stock: 23,
    organic: true,
    rating: 4.5,
    reviews: 78
  }
];

const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return { cart, addToCart, removeFromCart, cartTotal, cartItemCount };
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 relative"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
          {product.discount}% OFF
        </div>
      )}

      {/* Organic Badge */}
      {product.organic && (
        <div className="absolute top-3 right-3 z-10 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
          Organic
        </div>
      )}

      {/* Product Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
        
        {/* Category */}
        <p className="text-gray-500 text-sm mb-3">{product.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-700 font-bold text-xl">
            Rs. {product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">
              Rs. {product.originalPrice}
            </span>
          )}
          <span className="text-gray-600 text-sm">{product.priceUnit}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

// Main App Component
export default function FreshMartGroceryStore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cart, addToCart, removeFromCart, cartTotal, cartItemCount } = useCart();

  const categories = [
    { id: 'all', name: 'All Products', active: true },
    { id: 'vegetables', name: 'Vegetables', active: false },
    { id: 'grains', name: 'Grains', active: false },
    { id: 'dairy', name: 'Dairy', active: false },
    { id: 'oils', name: 'Oils', active: false },
    { id: 'natural', name: 'Natural', active: false },
    { id: 'beverages', name: 'Beverages', active: false }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCT_DATABASE.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Varsha Stores</h1>
              <span className="text-sm text-gray-500 ml-2">Gali Mart</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
              </button>
              <span className="text-sm font-medium text-gray-700">Sign In</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shop by Category Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg">Find everything you need from fresh vegetables to daily essentials</p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Cart Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Cart Header */}
              <div className="bg-green-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Shopping Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-green-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-green-100 text-sm mt-1">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Cart Content */}
              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Add some items to get started!</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <p className="text-green-600 font-semibold">
                              Rs. {item.price} {item.priceUnit}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Qty: {item.quantity}</p>
                            <p className="text-green-600 font-bold">
                              Rs. {(item.price * item.quantity).toFixed(0)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-xl font-bold mb-4">
                        <span>Total:</span>
                        <span className="text-green-600">Rs. {cartTotal.toFixed(0)}</span>
                      </div>
                      <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
