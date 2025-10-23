import React from 'react';
import { Input, Button, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface ChatBotInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

export const ChatBotInput: React.FC<ChatBotInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  isLoading,
}) => {
  return (
    <div
      className="chatbot-input"
      style={{
        padding: '12px',
        borderTop: '1px solid #f0f0f0',
        backgroundColor: 'white',
      }}
    >
      <Space.Compact style={{ width: '100%' }}>
        <TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="မက်ဆေ့ခ်ျရေးပါ..."
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{ resize: 'none' }}
          disabled={isLoading}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          loading={isLoading}
          aria-label="Send message"
        />
      </Space.Compact>
    </div>
  );
};
