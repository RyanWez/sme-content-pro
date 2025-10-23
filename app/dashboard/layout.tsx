'use client';

import React, { useState, useEffect } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);
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
    // Close mobile menu after navigation
    setMobileMenuOpen(false);
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
        {/* Desktop Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="desktop-sidebar"
          breakpoint="lg"
        >
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
            {/* Desktop Toggle Button */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="desktop-toggle-btn"
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                marginLeft: 0,
              }}
            />
            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                marginLeft: 0,
                display: 'none',
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

        {/* Mobile Sidebar Drawer - Only render after mount */}
        {mounted && (
          <>
            <div
              className={`mobile-sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              className={`mobile-sidebar ${mobileMenuOpen ? 'active' : ''}`}
            >
              <div
                style={{
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  <ContentBrushPen style={{ fontSize: 24 }} />
                  <span>SME</span>
                </div>
                <Button
                  type="text"
                  icon={<MenuFoldOutlined />}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'white' }}
                />
              </div>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={getSelectedKey()}
                items={menuItems}
                onClick={handleMenuClick}
                style={{ flex: 1, borderRight: 0 }}
              />
            </div>
          </>
        )}
      </Layout>

      {/* Responsive Styles */}
      <style jsx global>{`
        /* Mobile Sidebar - Hidden by default on ALL screens */
        .mobile-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.45);
          z-index: 999;
          display: none;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: none;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          max-width: 85vw;
          background-color: #001529;
          z-index: 1000;
          display: none;
          flex-direction: column;
          transform: translateX(-100%);
          transition: none;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
        }

        /* Desktop - Show desktop sidebar only */
        .desktop-sidebar {
          display: block !important;
        }
        
        .desktop-toggle-btn {
          display: inline-flex !important;
        }
        
        .mobile-menu-btn {
          display: none !important;
        }

        /* Mobile & Tablet (< 1024px) - Hide desktop, show mobile menu */
        @media (max-width: 1023px) {
          /* Hide desktop sidebar completely */
          .desktop-sidebar,
          .ant-layout-sider {
            display: none !important;
          }
          
          .desktop-toggle-btn {
            display: none !important;
          }
          
          /* Show mobile menu button */
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          
          /* Enable mobile sidebar with transitions after mount */
          .mobile-sidebar-overlay {
            display: block;
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                        visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .mobile-sidebar {
            display: flex;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .mobile-sidebar-overlay.active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }

          .mobile-sidebar.active {
            transform: translateX(0);
          }

          /* Prevent body scroll when mobile menu is open */
          body:has(.mobile-sidebar.active) {
            overflow: hidden;
          }

          /* Optimize menu animations */
          .mobile-sidebar .ant-menu {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
          }

          .mobile-sidebar .ant-menu-item,
          .mobile-sidebar .ant-menu-submenu {
            transition: background-color 0.2s ease;
          }
        }

        /* Small mobile optimization */
        @media (max-width: 480px) {
          .mobile-sidebar {
            width: 260px;
            max-width: 90vw;
          }
        }

        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          .mobile-sidebar,
          .mobile-sidebar-overlay {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
