import React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import HeaderBreadcrumb from '@/components/ui/HeaderBreadcrumb';

const { Header } = Layout;

interface DashboardHeaderProps {
  collapsed: boolean;
  colorBgContainer: string;
  onToggleSidebar: () => void;
  onToggleMobileMenu: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  collapsed,
  colorBgContainer,
  onToggleSidebar,
  onToggleMobileMenu,
}) => {
  return (
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
        onClick={onToggleSidebar}
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
        onClick={onToggleMobileMenu}
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
  );
};
