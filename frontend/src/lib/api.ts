import axios from 'axios';
import type { User, Deal, Claim, AuthResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000/api');

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authApi = {
    login: async (credentials: any): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },
    register: async (userData: any): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<{ user: User }>('/auth/me');
        return response.data.user;
    },
};

export const dealsApi = {
    getAll: async () => {
        const response = await api.get<{ deals: Deal[] }>('/deals');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<{ deal: Deal }>(`/deals/${id}`);
        return response.data.deal;
    },
};

export const claimsApi = {
    create: async (data: { dealId: string }) => {
        const response = await api.post<{ message: string; claim: Claim; claimCode?: string }>('/claims', data);
        return response.data;
    },
    getMyClaims: async () => {
        const response = await api.get<{ claims: Claim[] }>('/claims/my-claims');
        return response.data;
    },
};

export default api;
