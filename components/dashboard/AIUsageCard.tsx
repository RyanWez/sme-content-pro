'use client';

import { Card, Progress, Space, Statistic, Row, Col } from 'antd';
import { ThunderboltOutlined, ApiOutlined } from '@ant-design/icons';
import { AIUsageStats } from '@/types/dashboard';

interface AIUsageCardProps {
  stats: AIUsageStats;
}

export default function AIUsageCard({ stats }: AIUsageCardProps) {
  const tokenPercentage = Math.round((stats.tokensUsed / stats.tokensLimit) * 100);
  const requestPercentage = Math.round((stats.requestsToday / stats.requestsLimit) * 100);

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return '#52c41a';
    if (percentage < 80) return '#faad14';
    return '#ff4d4f';
  };

  return (
    <Card title="AI Usage Stats" style={{ height: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Tokens Usage */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <ThunderboltOutlined style={{ fontSize: 20, color: '#1890ff', marginRight: 8 }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Tokens Used</span>
          </div>
          <Progress
            percent={tokenPercentage}
            strokeColor={getProgressColor(tokenPercentage)}
            format={() => `${tokenPercentage}%`}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
            {stats.tokensUsed.toLocaleString()} / {stats.tokensLimit.toLocaleString()} tokens
          </div>
        </div>

        {/* Requests Today */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <ApiOutlined style={{ fontSize: 20, color: '#52c41a', marginRight: 8 }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Requests Today</span>
          </div>
          <Progress
            percent={requestPercentage}
            strokeColor={getProgressColor(requestPercentage)}
            format={() => `${requestPercentage}%`}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
            {stats.requestsToday} / {stats.requestsLimit} requests
          </div>
        </div>

        {/* Quick Stats */}
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" style={{ background: '#f0f5ff', border: 'none' }}>
              <Statistic
                title="Avg/Request"
                value={Math.round(stats.tokensUsed / stats.requestsToday)}
                suffix="tokens"
                valueStyle={{ fontSize: 16 }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" style={{ background: '#f6ffed', border: 'none' }}>
              <Statistic
                title="Remaining"
                value={stats.requestsLimit - stats.requestsToday}
                suffix="req"
                valueStyle={{ fontSize: 16 }}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </Card>
  );
}
