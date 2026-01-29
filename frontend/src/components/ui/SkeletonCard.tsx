'use client';

import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            {/* Image skeleton */}
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>

            {/* Category badge skeleton */}
            <div className="w-20 h-6 bg-gray-200 rounded-full mb-3"></div>

            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded mb-2"></div>

            {/* Partner skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>

            {/* Discount skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>

            {/* Footer skeleton */}
            <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    );
}
