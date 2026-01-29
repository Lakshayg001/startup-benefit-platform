'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { dealsApi } from '@/lib/api';
import type { Deal } from '@/types';
import Navbar from '@/components/layout/Navbar';
import DealCard from '@/components/deals/DealCard';

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showLockedOnly, setShowLockedOnly] = useState(false);

    const categories = [
        { id: 'all', label: 'All Deals', emoji: '✨' },
        { id: 'cloud', label: 'Cloud', emoji: '☁️' },
        { id: 'marketing', label: 'Marketing', emoji: '📢' },
        { id: 'analytics', label: 'Analytics', emoji: '📊' },
        { id: 'productivity', label: 'Productivity', emoji: '⚡' },
        { id: 'design', label: 'Design', emoji: '🎨' },
        { id: 'development', label: 'Development', emoji: '💻' }
    ];

    useEffect(() => {
        fetchDeals();
    }, []);

    useEffect(() => {
        filterDeals();
    }, [deals, searchTerm, selectedCategory, showLockedOnly]);

    const fetchDeals = async () => {
        try {
            const response = await dealsApi.getAll();
            setDeals(response.deals);
        } catch (error) {
            console.error('Error fetching deals:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterDeals = () => {
        let filtered = deals;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(deal => deal.category === selectedCategory);
        }

        if (showLockedOnly) {
            filtered = filtered.filter(deal => deal.isLocked);
        }

        if (searchTerm) {
            filtered = filtered.filter(deal =>
                deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredDeals(filtered);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>50+ Exclusive Deals Available</span>
                    </div>

                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">Amazing Deals</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover exclusive offers that help your startup save thousands
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-8 shadow-xl"
                >
                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for AWS, Notion, Stripe..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <div className="text-sm font-semibold text-gray-600 mb-3">Categories</div>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`
                    px-5 py-3 rounded-xl font-semibold transition-all border-2
                    ${selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white border-transparent shadow-lg'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                                        }
                  `}
                                >
                                    <span className="mr-2">{category.emoji}</span>
                                    {category.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Show Locked */}
                    <motion.label
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center space-x-3 cursor-pointer bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200"
                    >
                        <input
                            type="checkbox"
                            checked={showLockedOnly}
                            onChange={(e) => setShowLockedOnly(e.target.checked)}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                            🔒 Show verified-only deals
                        </span>
                    </motion.label>
                </motion.div>

                {/* Results */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 flex items-center justify-between"
                >
                    <p className="text-gray-700">
                        Showing <span className="font-bold text-indigo-600 text-lg">{filteredDeals.length}</span> deals
                    </p>
                    {filteredDeals.length > 0 && (
                        <div className="text-sm text-gray-600">
                            💰 Total potential savings: <span className="font-bold text-green-600">$100K+</span>
                        </div>
                    )}
                </motion.div>

                {/* Grid */}
                {filteredDeals.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredDeals.map((deal) => (
                            <DealCard key={deal._id} deal={deal} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 bg-white rounded-2xl border-2 border-gray-200"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No deals found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setShowLockedOnly(false);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg"
                        >
                            Clear Filters
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}