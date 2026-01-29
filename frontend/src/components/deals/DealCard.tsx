'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, TrendingUp, Clock } from 'lucide-react';
import type { Deal } from '@/types';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const categoryConfig: Record<string, { bg: string; text: string; gradient: string }> = {
    cloud: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      gradient: 'from-blue-500 to-cyan-500'
    },
    marketing: {
      bg: 'bg-pink-50',
      text: 'text-pink-700',
      gradient: 'from-pink-500 to-rose-500'
    },
    analytics: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      gradient: 'from-purple-500 to-indigo-500'
    },
    productivity: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      gradient: 'from-green-500 to-emerald-500'
    },
    design: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      gradient: 'from-orange-500 to-amber-500'
    },
    development: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      gradient: 'from-indigo-500 to-purple-500'
    }
  };

  const config = categoryConfig[deal.category] || categoryConfig.cloud;

  return (
    <Link href={`/deals/${deal._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-2xl transition-all cursor-pointer h-full overflow-hidden"
      >
        {/* Gradient hover effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

        {/* Locked Badge */}
        {deal.isLocked && (
          <div className="absolute top-4 right-4 bg-yellow-100 border-2 border-yellow-300 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}

        {/* Logo */}
        {deal.partnerLogo && (
          <div className="mb-4">
            <div className="w-14 h-14 bg-gray-50 rounded-xl p-2 border-2 border-gray-200 group-hover:border-indigo-300 transition-colors">
              <img
                src={deal.partnerLogo}
                alt={deal.partnerName}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-3">
          <span className={`${config.bg} ${config.text} px-3 py-1 rounded-lg text-xs font-bold uppercase`}>
            {deal.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {deal.title}
        </h3>

        {/* Partner */}
        <p className="text-sm text-gray-600 mb-3">
          by {deal.partnerName}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {deal.description}
        </p>

        {/* Discount Box */}
        <div className={`bg-gradient-to-r ${config.gradient} text-white p-4 rounded-xl mb-4 shadow-lg`}>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <div>
              <div className="text-xs opacity-90">Save</div>
              <div className="text-lg font-bold">{deal.discount}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-900">{deal.claimedCount}</span>
            <span>claimed</span>
          </div>
          {deal.claimLimit && (
            <div className="flex items-center space-x-1 text-indigo-600">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deal.claimLimit - deal.claimedCount} left</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}