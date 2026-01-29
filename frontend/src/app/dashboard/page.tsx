'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock, XCircle, User, Mail, Building, TrendingUp, Award } from 'lucide-react';
import { claimsApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import type { Claim, Deal } from '@/types';
import Navbar from '@/components/layout/Navbar';

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            fetchClaims();
        }
    }, [user, authLoading]);

    const fetchClaims = async () => {
        try {
            const response = await claimsApi.getMyClaims();
            setClaims(response.claims);
        } catch (error) {
            console.error('Error fetching claims:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusConfig = (status: string) => {
        const configs = {
            pending: {
                icon: <Clock className="w-4 h-4" />,
                bg: 'bg-yellow-100',
                border: 'border-yellow-300',
                text: 'text-yellow-700',
                label: 'Pending',
                gradient: 'from-yellow-400 to-orange-500'
            },
            approved: {
                icon: <CheckCircle className="w-4 h-4" />,
                bg: 'bg-green-100',
                border: 'border-green-300',
                text: 'text-green-700',
                label: 'Approved',
                gradient: 'from-green-400 to-emerald-500'
            },
            rejected: {
                icon: <XCircle className="w-4 h-4" />,
                bg: 'bg-red-100',
                border: 'border-red-300',
                text: 'text-red-700',
                label: 'Rejected',
                gradient: 'from-red-400 to-rose-500'
            },
            expired: {
                icon: <XCircle className="w-4 h-4" />,
                bg: 'bg-gray-100',
                border: 'border-gray-300',
                text: 'text-gray-700',
                label: 'Expired',
                gradient: 'from-gray-400 to-slate-500'
            }
        };
        return configs[status as keyof typeof configs] || configs.pending;
    };

    const calculateTotalSavings = () => {
        return claims.filter(c => c.status === 'approved').length * 5000; // Rough estimate
    };

    if (authLoading || loading) {
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

    if (!user) return null;

    const approvedCount = claims.filter(c => c.status === 'approved').length;
    const pendingCount = claims.filter(c => c.status === 'pending').length;
    const totalSavings = calculateTotalSavings();

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">{user?.name || 'User'}!</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Here's your savings dashboard
                    </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8 shadow-xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center space-x-4 mb-6 md:mb-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                                {user.companyName && (
                                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                        <Building className="w-4 h-4" />
                                        <span>{user.companyName}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Verification Badge */}
                        <div>
                            {user.isVerified ? (
                                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 text-green-700 px-4 py-2 rounded-xl font-semibold">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Verified Account</span>
                                </div>
                            ) : (
                                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 text-yellow-700 px-4 py-2 rounded-xl font-semibold">
                                    <Award className="w-5 h-5" />
                                    <span>Not Verified</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t-2 border-gray-100">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200"
                        >
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                {claims.length}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                Total Claims
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200"
                        >
                            <div className="text-4xl font-bold text-green-600 mb-2">
                                {approvedCount}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                Approved
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200"
                        >
                            <div className="text-4xl font-bold text-yellow-600 mb-2">
                                {pendingCount}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                Pending
                            </div>
                        </motion.div>
                    </div>

                    {/* Total Savings Banner */}
                    {approvedCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white p-6 rounded-2xl text-center"
                        >
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <TrendingUp className="w-6 h-6" />
                                <span className="text-lg font-semibold">Total Savings</span>
                            </div>
                            <div className="text-5xl font-bold">
                                ${totalSavings.toLocaleString()}+
                            </div>
                            <p className="text-indigo-100 mt-2">
                                You're saving thousands with StartupDeals! 🎉
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Claimed Deals Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            My Claimed Deals
                        </h2>
                        {claims.length > 0 && (
                            <div className="text-sm text-gray-600">
                                {claims.length} {claims.length === 1 ? 'deal' : 'deals'} claimed
                            </div>
                        )}
                    </div>

                    {claims.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {claims.map((claim, index) => {
                                const deal = claim.deal as Deal;
                                const statusConfig = getStatusConfig(claim.status);

                                return (
                                    <motion.div
                                        key={claim._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
                                    >
                                        {/* Deal Header */}
                                        <div className="flex items-start space-x-3 mb-4">
                                            {deal.partnerLogo && (
                                                <div className="w-12 h-12 bg-gray-50 rounded-xl p-2 border-2 border-gray-200 flex-shrink-0">
                                                    <img
                                                        src={deal.partnerLogo}
                                                        alt={deal.partnerName}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 mb-1 truncate">
                                                    {deal.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {deal.partnerName}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Discount Box */}
                                        <div className={`bg-gradient-to-r ${statusConfig.gradient} text-white p-4 rounded-xl mb-4 shadow-lg`}>
                                            <div className="text-xs opacity-90 mb-1">Your Savings</div>
                                            <div className="text-xl font-bold">{deal.discount}</div>
                                        </div>

                                        {/* Status */}
                                        <div className="mb-4">
                                            <div className="text-xs text-gray-600 mb-2 font-semibold">Status</div>
                                            <div className={`${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} border-2 px-3 py-2 rounded-lg font-semibold flex items-center space-x-2`}>
                                                {statusConfig.icon}
                                                <span>{statusConfig.label}</span>
                                            </div>
                                        </div>

                                        {/* Claim Code */}
                                        {claim.claimCode && claim.status === 'approved' && (
                                            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border-2 border-indigo-200 rounded-xl p-3 mb-4">
                                                <div className="text-xs text-gray-600 mb-1 font-semibold">
                                                    Claim Code
                                                </div>
                                                <div className="text-sm font-mono font-bold text-indigo-600">
                                                    {claim.claimCode}
                                                </div>
                                            </div>
                                        )}

                                        {/* Claimed Date */}
                                        <div className="text-xs text-gray-500 pt-4 border-t-2 border-gray-100">
                                            Claimed on {new Date(claim.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl border-2 border-gray-200 p-16 text-center"
                        >
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                No deals claimed yet
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Start exploring exclusive deals to unlock massive savings
                            </p>
                            <motion.a
                                href="/deals"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                <Package className="w-5 h-5" />
                                <span>Browse Deals</span>
                            </motion.a>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}