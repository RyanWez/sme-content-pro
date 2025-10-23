import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import ChatBot from '@/components/features/ChatBot';

interface ChatBotWrapperProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ChatBotWrapper: React.FC<ChatBotWrapperProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  return (
    <>
      <FloatButton
        icon={<CustomerServiceOutlined />}
        type="primary"
        style={{ insetInlineEnd: 24 }}
        onClick={onToggle}
        tooltip="AI Assistant"
      />
      {isOpen && <ChatBot onClose={onClose} />}
    </>
  );
};
