'use client';

import { Card, Timeline, Tag } from 'antd';
import { ActivityItem } from '@/types/dashboard';
import { formatDate, getContentTypeColor, getActionIcon } from '@/lib/dashboard/utils';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card title="Recent Activity" style={{ height: '100%' }}>
      <Timeline
        items={activities.map((activity) => ({
          children: (
            <div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ marginRight: 8 }}>{getActionIcon(activity.action)}</span>
                <strong>{activity.title}</strong>
              </div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                <Tag
                  color={getContentTypeColor(activity.contentType)}
                  style={{ marginRight: 8 }}
                >
                  {activity.contentType}
                </Tag>
                {formatDate(activity.timestamp)}
              </div>
            </div>
          ),
          color: 'blue',
        }))}
      />
    </Card>
  );
}
