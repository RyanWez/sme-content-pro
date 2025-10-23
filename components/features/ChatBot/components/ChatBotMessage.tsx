import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AnimatedBotIcon from '@/components/ui/AnimatedBotIcon';
import { parseMarkdown } from '@/lib/ollama/markdown';
import { Message } from '@/lib/ollama/types';
import { BOT_MESSAGE_GRADIENT, USER_COLOR, AVATAR_SIZES } from '../utils/constants';

interface ChatBotMessageProps {
  message: Message;
  index: number;
}

export const ChatBotMessage: React.FC<ChatBotMessageProps> = ({ message, index }) => {
  const isUser = message.sender === 'user';

  return (
    <div
      role="article"
      aria-label={`${isUser ? 'Your' : 'AI'} message`}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12,
        animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          gap: 8,
          alignItems: 'flex-start',
        }}
      >
        <Avatar
          icon={isUser ? <UserOutlined /> : <AnimatedBotIcon size={28} />}
          style={{
            backgroundColor: isUser ? USER_COLOR : undefined,
            background: isUser ? USER_COLOR : BOT_MESSAGE_GRADIENT,
            color: isUser ? '#fff' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
          size={AVATAR_SIZES.default}
        />
        <div
          className="message-bubble"
          style={{
            maxWidth: 'calc(100% - 56px)',
            minWidth: '60px',
            width: 'fit-content',
            padding: '10px 14px',
            borderRadius: 8,
            backgroundColor: isUser ? USER_COLOR : 'white',
            color: isUser ? 'white' : 'black',
            overflowX: 'auto',
          }}
        >
          {!isUser ? (
            <>
              {message.text ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(message.text),
                  }}
                  style={{
                    color: 'black',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'normal',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    unicodeBidi: 'plaintext',
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                />
              ) : (
                <div className="thinking-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              )}
            </>
          ) : (
            <span
              className="user-message-text"
              style={{
                color: 'white',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6',
                wordSpacing: 'normal',
                unicodeBidi: 'plaintext',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {message.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
