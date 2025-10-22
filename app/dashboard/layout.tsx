'use client';

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, FloatButton } from 'antd';
import { ContentBrushPen } from '@/components/icons/ContentBrushPen';
import { BlocksScale } from '@/components/icons/BlocksScale';
import { Pencil2 } from '@/components/icons/Pencil2';
import { FormEditionClipboardWrite } from '@/components/icons/FormEditionClipboardWrite';
import { CollaborationsIdea } from '@/components/icons/CollaborationsIdea';
import { ProductLaunchLaptop } from '@/components/icons/ProductLaunchLaptop';
import { useRouter, usePathname } from 'next/navigation';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import HeaderBreadcrumb from '@/components/ui/HeaderBreadcrumb';
import ChatBot from '@/components/features/ChatBot';
import SuppressAntdWarning from '@/components/utils/SuppressAntdWarning';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getSelectedKey = () => {
    if (pathname === '/dashboard') return ['1'];
    if (pathname.includes('/dashboard/content/blog')) return ['2-1'];
    if (pathname.includes('/dashboard/content/promotion')) return ['2-2'];
    if (pathname.includes('/dashboard/content/product')) return ['2-3'];
    return ['1'];
  };

  const isOnDashboard = pathname === '/dashboard';

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === '1') {
      router.push('/dashboard');
    } else if (e.key === '2-1') {
      router.push('/dashboard/content/blog');
    } else if (e.key === '2-2') {
      router.push('/dashboard/content/promotion');
    } else if (e.key === '2-3') {
      router.push('/dashboard/content/product');
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <BlocksScale isActive={isOnDashboard} />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <Pencil2 />,
      label: 'Content',
      children: [
        {
          key: '2-1',
          icon: <FormEditionClipboardWrite />,
          label: 'Blog Content Writer',
        },
        {
          key: '2-2',
          icon: <CollaborationsIdea />,
          label: 'Promotion Idea',
        },
        {
          key: '2-3',
          icon: <ProductLaunchLaptop />,
          label: 'Product Caption',
        },
      ],
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ];

  return (
    <>
      <SuppressAntdWarning />
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 8,
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <ContentBrushPen style={{ fontSize: 24, flexShrink: 0 }} />
          {!collapsed && <span>SME</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingRight: 24,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginLeft: 0,
            }}
          />
          <HeaderBreadcrumb />
        </Header>
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
      </Layout>

      {/* ChatBot FloatButton */}
      <FloatButton
        icon={<CustomerServiceOutlined />}
        type="primary"
        style={{ insetInlineEnd: 24 }}
        onClick={() => setChatOpen(!chatOpen)}
        tooltip="AI Assistant"
      />

      {/* ChatBot Interface */}
      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
      </Layout>
    </>
  );
}
