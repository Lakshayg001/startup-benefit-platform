export interface User {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
    role: 'founder' | 'team_member' | 'indie_hacker';
    companyName?: string;
}

export interface Deal {
    _id: string;
    title: string;
    description: string;
    category: 'cloud' | 'marketing' | 'analytics' | 'productivity' | 'design' | 'development';
    partnerName: string;
    partnerLogo?: string;
    discount: string;
    originalPrice?: number;
    discountedPrice?: number;
    isLocked: boolean;
    eligibilityCriteria?: string;
    validUntil?: Date;
    claimLimit?: number;
    claimedCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Claim {
    _id: string;
    user: string | User;
    deal: string | Deal;
    status: 'pending' | 'approved' | 'rejected' | 'expired';
    claimCode?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface ApiError {
    message: string;
    errors?: string[];
}
