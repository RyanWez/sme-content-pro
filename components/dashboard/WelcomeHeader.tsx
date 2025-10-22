'use client';

import { useState } from 'react';
import { Card, Button, Dropdown, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getGreeting } from '@/lib/dashboard/utils';
import { FormEditionClipboardWrite } from '@/components/icons/FormEditionClipboardWrite';
import { CollaborationsIdea } from '@/components/icons/CollaborationsIdea';
import { ProductLaunchLaptop } from '@/components/icons/ProductLaunchLaptop';
import type { MenuProps } from 'antd';

export default function WelcomeHeader() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      label: 'Blog Content Writer',
      icon: <FormEditionClipboardWrite style={{ fontSize: 16 }} />,
      onClick: () => router.push('/dashboard/content/blog'),
    },
    {
      key: 'promotion',
      label: 'Promotion Idea',
      icon: <CollaborationsIdea style={{ fontSize: 16 }} />,
      onClick: () => router.push('/dashboard/content/promotion'),
    },
    {
      key: 'product',
      label: 'Product Caption',
      icon: <ProductLaunchLaptop style={{ fontSize: 16 }} />,
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
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          onOpenChange={setDropdownOpen}
          trigger={['click']}
        >
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            <Space>
              Quick Create
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
                style={{
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path d="M6 9L1 4h10z" />
              </svg>
            </Space>
          </Button>
        </Dropdown>
      </div>
    </Card>
  );
}
