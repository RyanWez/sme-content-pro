// Dashboard related types and interfaces

export interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'promotion' | 'product';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
}

export interface DashboardStats {
  totalContent: number;
  aiGenerated: number;
  thisMonth: number;
  savedTime: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  contentType: 'blog' | 'promotion' | 'product';
  timestamp: string;
  title: string;
}

export interface AIUsageStats {
  tokensUsed: number;
  tokensLimit: number;
  requestsToday: number;
  requestsLimit: number;
}

export type ContentType = 'all' | 'blog' | 'promotion' | 'product';
