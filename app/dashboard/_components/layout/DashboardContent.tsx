import React, { Suspense } from 'react';
import { Layout } from 'antd';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const { Content } = Layout;

interface DashboardContentProps {
  colorBgContainer: string;
  borderRadiusLG: number;
  children: React.ReactNode;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  colorBgContainer,
  borderRadiusLG,
  children,
}) => {
  return (
    <Content
      className="dashboard-content-area"
      style={{
        margin: '24px 16px',
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        overflow: 'auto',
        height: 'calc(100vh - 64px - 48px)',
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </Content>
  );
};
