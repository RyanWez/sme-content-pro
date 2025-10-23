import React from 'react';
import { Layout, Menu } from 'antd';
import { ContentBrushPen } from '@/components/icons/ContentBrushPen';
import { getMenuItems } from '../navigation/MenuItems';

const { Sider } = Layout;

interface DashboardSidebarProps {
  collapsed: boolean;
  selectedKeys: string[];
  isOnDashboard: boolean;
  onMenuClick: (e: { key: string }) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  selectedKeys,
  isOnDashboard,
  onMenuClick,
}) => {
  return (
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
        selectedKeys={selectedKeys}
        items={getMenuItems(isOnDashboard)}
        onClick={onMenuClick}
      />
    </Sider>
  );
};
