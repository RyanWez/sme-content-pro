// Mock data for dashboard (replace with real API calls later)

import { ContentItem, DashboardStats, ActivityItem, AIUsageStats } from '@/types/dashboard';

export const getMockStats = (): DashboardStats => ({
  totalContent: 245,
  aiGenerated: 189,
  thisMonth: 42,
  savedTime: '127 hrs',
});

export const getMockRecentContent = (): ContentItem[] => [
  {
    id: '1',
    title: 'How to Start a Small Business in Myanmar',
    type: 'blog',
    status: 'published',
    createdAt: '2025-10-20T10:30:00',
    updatedAt: '2025-10-20T14:20:00',
    wordCount: 1250,
  },
  {
    id: '2',
    title: 'New Year Promotion Ideas for Restaurants',
    type: 'promotion',
    status: 'draft',
    createdAt: '2025-10-21T09:15:00',
    updatedAt: '2025-10-21T16:45:00',
    wordCount: 850,
  },
  {
    id: '3',
    title: 'Handmade Soap Product Description',
    type: 'product',
    status: 'published',
    createdAt: '2025-10-19T14:00:00',
    updatedAt: '2025-10-19T15:30:00',
    wordCount: 320,
  },
  {
    id: '4',
    title: 'Digital Marketing Tips for SMEs',
    type: 'blog',
    status: 'draft',
    createdAt: '2025-10-22T08:00:00',
    updatedAt: '2025-10-22T08:00:00',
    wordCount: 0,
  },
  {
    id: '5',
    title: 'Flash Sale Campaign Copy',
    type: 'promotion',
    status: 'published',
    createdAt: '2025-10-18T11:20:00',
    updatedAt: '2025-10-18T13:10:00',
    wordCount: 450,
  },
];

export const getMockActivities = (): ActivityItem[] => [
  {
    id: '1',
    action: 'created',
    contentType: 'blog',
    timestamp: '2025-10-22T08:00:00',
    title: 'Digital Marketing Tips for SMEs',
  },
  {
    id: '2',
    action: 'published',
    contentType: 'promotion',
    timestamp: '2025-10-21T16:45:00',
    title: 'New Year Promotion Ideas',
  },
  {
    id: '3',
    action: 'updated',
    contentType: 'product',
    timestamp: '2025-10-21T14:30:00',
    title: 'Handmade Soap Description',
  },
  {
    id: '4',
    action: 'created',
    contentType: 'blog',
    timestamp: '2025-10-20T10:30:00',
    title: 'How to Start a Small Business',
  },
];

export const getMockAIUsage = (): AIUsageStats => ({
  tokensUsed: 45230,
  tokensLimit: 100000,
  requestsToday: 28,
  requestsLimit: 100,
});
