import React from 'react';
import { Button, Menu } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import { ContentBrushPen } from '@/components/icons/ContentBrushPen';
import { getMenuItems } from '../navigation/MenuItems';

interface MobileSidebarProps {
  isOpen: boolean;
  selectedKeys: string[];
  isOnDashboard: boolean;
  onClose: () => void;
  onMenuClick: (e: { key: string }) => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  selectedKeys,
  isOnDashboard,
  onClose,
  onMenuClick,
}) => {
  return (
    <>
      <div
        className={`mobile-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-sidebar ${isOpen ? 'active' : ''}`}>
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
            onClick={onClose}
            style={{ color: 'white' }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={getMenuItems(isOnDashboard)}
          onClick={onMenuClick}
          style={{ flex: 1, borderRight: 0 }}
        />
      </div>
    </>
  );
};
