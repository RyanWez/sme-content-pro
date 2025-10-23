import React from 'react';
import { Button, Avatar, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import AnimatedBotIcon from '@/components/ui/AnimatedBotIcon';
import { BOT_GRADIENT, AVATAR_SIZES } from '../utils/constants';

interface ChatBotHeaderProps {
  onClose: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export const ChatBotHeader: React.FC<ChatBotHeaderProps> = ({
  onClose,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  return (
    <>
      {/* Swipe Indicator (Mobile only) */}
      <div className="swipe-indicator" />

      {/* Header */}
      <div
        className="chatbot-header"
        style={{
          padding: '16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#1890ff',
          color: 'white',
          cursor: 'grab',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Space>
          <Avatar
            icon={<AnimatedBotIcon size={28} />}
            style={{
              background: BOT_GRADIENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            size={AVATAR_SIZES.default}
          />
          <span style={{ color: 'white', fontSize: 16, fontWeight: 600, userSelect: 'none' }}>
            AI Assistant
          </span>
        </Space>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
          style={{ color: 'white' }}
          aria-label="Close chat"
        />
      </div>
    </>
  );
};
