'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ExternalLink,
    Shield,
    Clock,
    Users,
    CheckCircle,
    AlertCircle,
    Lock,
    Copy
} from 'lucide-react';
import { dealsApi, claimsApi } from '@/lib/api';
import type { Deal } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';

export default function DealDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [deal, setDeal] = useState<Deal | null>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [error, setError] = useState('');
    const [claimCode, setClaimCode] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchDeal(params.id as string);
        }
    }, [params.id]);

    const fetchDeal = async (id: string) => {
        try {
            const data = await dealsApi.getById(id);
            setDeal(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load deal details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async () => {
        if (!user) {
            router.push(`/login?redirect=/deals/${deal?._id}`);
            return;
        }

        setClaiming(true);
        try {
            if (!deal) return;
            const response = await claimsApi.create({ dealId: deal._id });
            setClaimCode(response.claimCode || 'CODE-EMAILED');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to claim deal');
        } finally {
            setClaiming(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    if (!deal) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Deal not found</h2>
                    <Button
                        className="mt-4"
                        onClick={() => router.push('/deals')}
                        variant="outline"
                    >
                        Back to Deals
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Deals
                </button>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="relative h-48 bg-gradient-to-r from-primary-600 to-purple-600">
                        {deal.partnerLogo && (
                            <div className="absolute -bottom-10 left-8 p-2 bg-white rounded-xl shadow-lg">
                                <img
                                    src={deal.partnerLogo}
                                    alt={deal.partnerName}
                                    className="w-20 h-20 object-contain rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{deal.title}</h1>
                                <p className="text-xl text-primary-600 font-semibold">{deal.discount}</p>
                            </div>
                            <div className="flex space-x-3">
                                {deal.isLocked && !user?.isVerified && (
                                    <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg flex items-center">
                                        <Lock className="w-4 h-4 mr-2" />
                                        <span className="font-medium">Verified Only</span>
                                    </div>
                                )}
                                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium capitalize">
                                    {deal.category}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {deal.description}
                        </p>

                        {/* Deal Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-6 border-y border-gray-100">
                            <div className="flex flex-col items-center text-center">
                                <Users className="w-6 h-6 text-gray-400 mb-2" />
                                <span className="text-2xl font-bold text-gray-900">{deal.claimedCount}</span>
                                <span className="text-sm text-gray-500">Claimed</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Shield className="w-6 h-6 text-gray-400 mb-2" />
                                <span className="text-sm font-bold text-gray-900 mt-1">Verified</span>
                                <span className="text-sm text-gray-500">Partner</span>
                            </div>
                            {deal.validUntil && (
                                <div className="flex flex-col items-center text-center">
                                    <Clock className="w-6 h-6 text-gray-400 mb-2" />
                                    <span className="text-sm font-bold text-gray-900 mt-1">
                                        {new Date(deal.validUntil).toLocaleDateString()}
                                    </span>
                                    <span className="text-sm text-gray-500">Expires</span>
                                </div>
                            )}
                            {deal.claimLimit && (
                                <div className="flex flex-col items-center text-center">
                                    <AlertCircle className="w-6 h-6 text-gray-400 mb-2" />
                                    <span className="text-2xl font-bold text-gray-900">
                                        {deal.claimLimit - deal.claimedCount}
                                    </span>
                                    <span className="text-sm text-gray-500">Remaining</span>
                                </div>
                            )}
                        </div>

                        {/* Eligibility */}
                        {deal.eligibilityCriteria && (
                            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Eligibility Criteria
                                </h3>
                                <p className="text-blue-800">{deal.eligibilityCriteria}</p>
                            </div>
                        )}

                        {/* Claim Action */}
                        <div className="flex flex-col items-center justify-center pt-4">
                            {error && (
                                <div className="mb-4 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {claimCode ? (
                                <div className="w-full bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                                    <h3 className="text-xl font-bold text-green-900 mb-2">Deal Claimed Successfully!</h3>
                                    <p className="text-green-700 mb-4">Here is your claim code:</p>
                                    <div className="flex items-center justify-center space-x-2 mb-4">
                                        <code className="bg-white px-4 py-2 rounded-lg border border-green-200 text-2xl font-mono font-bold text-green-800">
                                            {claimCode}
                                        </code>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(claimCode)}
                                            className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-700"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(deal.partnerName ? `https://${deal.partnerName.toLowerCase()}.com` : '#', '_blank')}
                                    >
                                        Visit Partner Website <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    size="lg"
                                    onClick={handleClaim}
                                    disabled={claiming || (deal.isLocked && !user?.isVerified)}
                                    className="w-full md:w-auto min-w-[200px]"
                                >
                                    {claiming ? 'Claiming...' : 'Claim This Deal'}
                                </Button>
                            )}

                            {deal.isLocked && !user?.isVerified && !claimCode && (
                                <p className="mt-4 text-sm text-gray-500 flex items-center">
                                    <Lock className="w-4 h-4 mr-1" />
                                    You must be a verified startup to claim this deal
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
