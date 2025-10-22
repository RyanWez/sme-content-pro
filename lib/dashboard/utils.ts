// Dashboard utility functions

import { ContentType } from '@/types/dashboard';

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  });
};

export const getContentTypeColor = (type: ContentType): string => {
  const colors = {
    all: 'default',
    blog: 'blue',
    promotion: 'orange',
    product: 'green',
  };
  return colors[type] || 'default';
};

export const getStatusColor = (status: string): string => {
  const colors = {
    draft: 'default',
    published: 'success',
    archived: 'warning',
  };
  return colors[status as keyof typeof colors] || 'default';
};

export const getActionIcon = (action: string): string => {
  const icons = {
    created: '➕',
    updated: '✏️',
    published: '✅',
    archived: '📦',
  };
  return icons[action as keyof typeof icons] || '•';
};
