'use client';

import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
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

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const stats = getMockStats();
  const recentContent = getMockRecentContent();
  const activities = getMockActivities();
  const aiUsage = getMockAIUsage();

  return (
    <>
      {/* Welcome Header with Quick Create */}
      <WelcomeHeader />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Content Overview Table */}
      <ContentTable data={recentContent} />

      {/* Bottom Section: Activity Feed + AI Usage */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ActivityFeed activities={activities} />
        </Col>
        <Col xs={24} lg={12}>
          <AIUsageCard stats={aiUsage} />
        </Col>
      </Row>
    </>
  );
}
