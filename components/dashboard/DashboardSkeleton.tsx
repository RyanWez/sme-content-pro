'use client';

import { Card, Col, Row, Skeleton } from 'antd';

export default function DashboardSkeleton() {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
      {/* Welcome Header Skeleton */}
      <Card
        style={{
          marginBottom: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          minHeight: 120,
        }}
        styles={{ body: { padding: '24px 32px' } }}
      >
        <Skeleton
          active
          paragraph={{ rows: 1 }}
          title={{ width: '40%' }}
          style={{ filter: 'brightness(1.2)' }}
        />
      </Card>

      {/* Stats Cards Skeleton */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[1, 2, 3, 4].map((i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Content Table Skeleton */}
      <Card style={{ marginBottom: 24 }}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>

      {/* Bottom Section Skeleton */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
