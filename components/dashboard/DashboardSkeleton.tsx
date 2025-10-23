'use client';

import { Card, Col, Row, Skeleton } from 'antd';

export default function DashboardSkeleton() {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
      {/* Stats Cards Skeleton */}
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4].map((i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
