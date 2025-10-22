'use client';

import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import {
  WelcomeHeader,
  StatsCards,
  ContentTable,
  ActivityFeed,
  AIUsageCard,
} from '@/components/dashboard';
import {
  getMockStats,
  getMockRecentContent,
  getMockActivities,
  getMockAIUsage,
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
  const recentContent = getMockRecentContent();
  const activities = getMockActivities();
  const aiUsage = getMockAIUsage();

  return (
    <>
      {/* Welcome Header with Quick Create */}
      <div className="dashboard-welcome">
        <WelcomeHeader />
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <StatsCards stats={stats} />
      </div>

      {/* Content Overview Table */}
      <div className="dashboard-content-table">
        <ContentTable data={recentContent} />
      </div>

      {/* Bottom Section: Activity Feed + AI Usage */}
      <div className="dashboard-bottom-section">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <ActivityFeed activities={activities} />
          </Col>
          <Col xs={24} lg={12}>
            <AIUsageCard stats={aiUsage} />
          </Col>
        </Row>
      </div>
    </>
  );
}
