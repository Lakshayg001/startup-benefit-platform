'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, User, Package } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-gray-900">
                                StartupDeals
                            </span>
                        </motion.div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center space-x-6">
                        <Link href="/deals">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors cursor-pointer"
                            >
                                Browse Deals
                            </motion.span>
                        </Link>

                        {user ? (
                            <>
                                <Link href="/dashboard">
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-semibold transition-colors cursor-pointer"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Dashboard</span>
                                    </motion.span>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={logout}
                                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-red-600 font-semibold transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors"
                                    >
                                        Login
                                    </motion.button>
                                </Link>

                                <Link href="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-xl transition-all"
                                    >
                                        Sign Up
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}