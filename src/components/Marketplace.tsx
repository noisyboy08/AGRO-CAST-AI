import React, { useState } from 'react';
import { Plus, MapPin, Phone, Mail, Filter, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketplaceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  quantity: number;
  pricePerTon: number;
  location: string;
  harvestDate: string;
  quality: 'Premium' | 'Standard' | 'Organic';
  description: string;
  phone: string;
  email: string;
  imageUrl?: string;
  createdAt: string;
}

const Marketplace = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<MarketplaceListing[]>([
    {
      id: '1',
      farmerId: '1',
      farmerName: 'John Smith',
      crop: 'Corn',
      quantity: 50,
      pricePerTon: 180,
      location: 'Iowa, USA',
      harvestDate: '2024-09-15',
      quality: 'Premium',
      description: 'High-quality corn, well-dried and stored properly. Perfect for feed or processing.',
      phone: '+1-555-0123',
      email: 'john.smith@farm.com',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      farmerId: '2',
      farmerName: 'Maria Garcia',
      crop: 'Soybeans',
      quantity: 30,
      pricePerTon: 440,
      location: 'Nebraska, USA',
      harvestDate: '2024-10-01',
      quality: 'Organic',
      description: 'Certified organic soybeans, non-GMO. Ideal for premium markets.',
      phone: '+1-555-0456',
      email: 'maria.garcia@organicfarm.com',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      farmerId: '3',
      farmerName: 'David Chen',
      crop: 'Wheat',
      quantity: 75,
      pricePerTon: 220,
      location: 'Kansas, USA',
      harvestDate: '2024-08-20',
      quality: 'Standard',
      description: 'Good quality wheat suitable for milling. Competitive pricing for bulk orders.',
      phone: '+1-555-0789',
      email: 'david.chen@wheatfarm.com',
      createdAt: '2024-01-13'
    }
  ]);

  const [showAddListing, setShowAddListing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [filterQuality, setFilterQuality] = useState('');

  const [newListing, setNewListing] = useState({
    crop: '',
    quantity: '',
    pricePerTon: '',
    location: '',
    harvestDate: '',
    quality: 'Standard' as const,
    description: '',
    phone: '',
    email: ''
  });

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = !filterCrop || listing.crop === filterCrop;
    const matchesQuality = !filterQuality || listing.quality === filterQuality;
    
    return matchesSearch && matchesCrop && matchesQuality;
  });

  const handleAddListing = () => {
    if (!user || user.role !== 'farmer') return;

    const listing: MarketplaceListing = {
      id: Date.now().toString(),
      farmerId: user.id,
      farmerName: user.name,
      ...newListing,
      quantity: parseInt(newListing.quantity),
      pricePerTon: parseInt(newListing.pricePerTon),
      createdAt: new Date().toISOString()
    };

    setListings([listing, ...listings]);
    setNewListing({
      crop: '',
      quantity: '',
      pricePerTon: '',
      location: '',
      harvestDate: '',
      quality: 'Standard',
      description: '',
      phone: '',
      email: ''
    });
    setShowAddListing(false);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Premium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Organic': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Crop Marketplace
        </h2>
        
        {user?.role === 'farmer' && (
          <button
            onClick={() => setShowAddListing(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            List Crop
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search crops, farmers, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
          />
        </div>
        
        <select
          value={filterCrop}
          onChange={(e) => setFilterCrop(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
        >
          <option value="">All Crops</option>
          <option value="Corn">Corn</option>
          <option value="Soybeans">Soybeans</option>
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
        </select>
        
        <select
          value={filterQuality}
          onChange={(e) => setFilterQuality(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
        >
          <option value="">All Quality</option>
          <option value="Premium">Premium</option>
          <option value="Standard">Standard</option>
          <option value="Organic">Organic</option>
        </select>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Filter className="h-4 w-4 mr-2" />
          {filteredListings.length} listings found
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {listing.crop}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {listing.farmerName}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(listing.quality)}`}>
                  {listing.quality}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quantity:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.quantity} tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ${listing.pricePerTon}/ton
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  {listing.location}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Harvest: {new Date(listing.harvestDate).toLocaleDateString()}
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                {listing.description}
              </p>

              <div className="flex space-x-2">
                <a
                  href={`tel:${listing.phone}`}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </a>
                <a
                  href={`mailto:${listing.email}`}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </a>
              </div>

              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Listed {new Date(listing.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            No listings found matching your criteria
          </p>
        </div>
      )}

      {/* Add Listing Modal */}
      <AnimatePresence>
        {showAddListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowAddListing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                List Your Crop
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crop Type
                  </label>
                  <select
                    value={newListing.crop}
                    onChange={(e) => setNewListing({...newListing, crop: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  >
                    <option value="">Select crop</option>
                    <option value="Corn">Corn</option>
                    <option value="Soybeans">Soybeans</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity (tons)
                  </label>
                  <input
                    type="number"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price per Ton ($)
                  </label>
                  <input
                    type="number"
                    value={newListing.pricePerTon}
                    onChange={(e) => setNewListing({...newListing, pricePerTon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality
                  </label>
                  <select
                    value={newListing.quality}
                    onChange={(e) => setNewListing({...newListing, quality: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Organic">Organic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newListing.location}
                    onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Harvest Date
                  </label>
                  <input
                    type="date"
                    value={newListing.harvestDate}
                    onChange={(e) => setNewListing({...newListing, harvestDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newListing.phone}
                    onChange={(e) => setNewListing({...newListing, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newListing.email}
                    onChange={(e) => setNewListing({...newListing, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  placeholder="Describe your crop quality, storage conditions, etc."
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowAddListing(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddListing}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  List Crop
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;