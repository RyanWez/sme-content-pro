'use client';

import { Card, Button, Dropdown, Space } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getGreeting } from '@/lib/dashboard/utils';
import type { MenuProps } from 'antd';

export default function WelcomeHeader() {
  const router = useRouter();
  const greeting = getGreeting();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const menuItems: MenuProps['items'] = [
    {
      key: 'blog',
      label: 'Blog Content',
      icon: '📝',
      onClick: () => router.push('/dashboard/content/blog'),
    },
    {
      key: 'promotion',
      label: 'Promotion Idea',
      icon: '💡',
      onClick: () => router.push('/dashboard/content/promotion'),
    },
    {
      key: 'product',
      label: 'Product Caption',
      icon: '📦',
      onClick: () => router.push('/dashboard/content/product'),
    },
  ];

  return (
    <Card
      style={{
        marginBottom: 24,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
      }}
      styles={{ body: { padding: '24px 32px' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: 28, fontWeight: 600 }}>
            {greeting}! 👋
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: '8px 0 0 0', fontSize: 14 }}>
            {currentDate}
          </p>
        </div>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            <Space>
              Quick Create
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </Card>
  );
}
