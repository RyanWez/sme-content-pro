'use client';

import React from 'react';
import { Layout, theme } from 'antd';
import SuppressAntdWarning from '@/components/utils/SuppressAntdWarning';
import { useDashboardLayout } from './_hooks/useDashboardLayout';
import { DashboardSidebar } from './_components/layout/DashboardSidebar';
import { MobileSidebar } from './_components/layout/MobileSidebar';
import { DashboardHeader } from './_components/layout/DashboardHeader';
import { DashboardContent } from './_components/layout/DashboardContent';
import { ChatBotWrapper } from './_components/chat/ChatBotWrapper';
import { ResponsiveStyles } from './_styles/responsive.styles';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    collapsed,
    mobileMenuOpen,
    chatOpen,
    mounted,
    pathname,
    getSelectedKey,
    handleMenuClick,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    toggleChat,
    closeChat,
  } = useDashboardLayout();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isOnDashboard = pathname === '/dashboard';

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <>
      <SuppressAntdWarning />
      <Layout style={{ minHeight: '100vh' }}>
        {/* Desktop Sidebar */}
        <DashboardSidebar
          collapsed={collapsed}
          selectedKeys={getSelectedKey()}
          isOnDashboard={isOnDashboard}
          onMenuClick={handleMenuClick}
        />

        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
          {/* Header */}
          <DashboardHeader
            collapsed={collapsed}
            colorBgContainer={colorBgContainer}
            onToggleSidebar={toggleSidebar}
            onToggleMobileMenu={toggleMobileMenu}
          />

          {/* Content */}
          <DashboardContent
            colorBgContainer={colorBgContainer}
            borderRadiusLG={borderRadiusLG}
          >
            {children}
          </DashboardContent>
        </Layout>

        {/* ChatBot */}
        <ChatBotWrapper
          isOpen={chatOpen}
          onToggle={toggleChat}
          onClose={closeChat}
        />

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          selectedKeys={getSelectedKey()}
          isOnDashboard={isOnDashboard}
          onClose={closeMobileMenu}
          onMenuClick={handleMenuClick}
        />
      </Layout>

      {/* Responsive Styles */}
      <ResponsiveStyles />
    </>
  );
}
