'use client';

import { useEffect, useState } from 'react';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import {
  StatsCards,
} from '@/components/dashboard';
import {
  getMockStats,
} from '@/lib/dashboard/mockData';
import './globals.css';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || loading) {
    return <DashboardSkeleton />;
  }

  const stats = getMockStats();

  return (
    <>
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <StatsCards stats={stats} />
      </div>
    </>
  );
}
