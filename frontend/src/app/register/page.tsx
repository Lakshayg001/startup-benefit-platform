'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Lock, Building, Briefcase } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        role: 'founder'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(formData);
            router.push('/deals');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
            <Navbar />

            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block"
                    >
                        <div className="text-6xl mb-6">🚀</div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Join 1000+ Startups
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                                Saving Thousands
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Get instant access to exclusive deals on premium SaaS tools worth over $100K
                        </p>

                        <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200">
                            <div className="text-sm font-semibold text-gray-600 mb-4">What you'll get:</div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="text-2xl">💰</div>
                                    <span>Save up to $100K on tools</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="text-2xl">⚡</div>
                                    <span>Instant deal activation</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="text-2xl">🎯</div>
                                    <span>50+ verified partners</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                                Create Your Account
                            </h2>
                            <p className="text-center text-gray-600 mb-8">
                                Start saving in under 2 minutes
                            </p>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border-2 border-red-200 text-red-600 p-4 rounded-xl mb-6"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@startup.com"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Min. 6 characters"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Company (Optional)
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Your Startup Inc."
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                                        >
                                            <option value="founder">Founder</option>
                                            <option value="team_member">Team Member</option>
                                            <option value="indie_hacker">Indie Hacker</option>
                                        </select>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mt-6"
                                >
                                    <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </form>

                            <p className="text-center text-sm text-gray-600 mt-6">
                                Already have an account?{' '}
                                <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}