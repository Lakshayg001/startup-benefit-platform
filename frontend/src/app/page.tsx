'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp, Users, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Instant access to 50+ premium deals',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Partners',
      description: 'Only trusted, industry-leading platforms',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Massive Savings',
      description: 'Save up to $100K on essential tools',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Join 1000+',
      description: 'Startups already using StartupDeals',
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const stats = [
    { value: '50+', label: 'SaaS Partners', icon: <Star className="w-5 h-5" /> },
    { value: '$100K', label: 'Avg Savings', icon: <TrendingUp className="w-5 h-5" /> },
    { value: '1000+', label: 'Happy Startups', icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              <span>Trusted by 1000+ Startups</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Save $100K+ on
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                Premium SaaS Tools
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access exclusive deals on cloud credits, marketing platforms, and productivity tools.
              Built specifically for early-stage startups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/deals">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explore Deals</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                >
                  Sign Up Free
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-indigo-100 to-pink-100 rounded-3xl p-8 border-4 border-white shadow-2xl">
              {/* Mock Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-2xl p-6 shadow-lg mb-4 border-2 border-indigo-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl" />
                  <div>
                    <div className="font-bold text-gray-900">AWS Credits</div>
                    <div className="text-sm text-gray-600">Save $5,000</div>
                  </div>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl" />
                  <div>
                    <div className="font-bold text-gray-900">Notion Pro</div>
                    <div className="text-sm text-gray-600">6 Months Free</div>
                  </div>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              >
                $100K Saved! 🎉
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-3 gap-6 bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl mb-3 text-indigo-600">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Startups Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to save and scale faster
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all group"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center overflow-hidden"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px)',
                backgroundSize: '50px 50px'
              }} />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Saving?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Join 1000+ startups already saving thousands
              </p>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}