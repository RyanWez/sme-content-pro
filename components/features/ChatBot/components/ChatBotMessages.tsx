import React, { RefObject } from 'react';
import { Message } from '@/lib/ollama/types';
import { ChatBotMessage } from './ChatBotMessage';

interface ChatBotMessagesProps {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
}

export const ChatBotMessages: React.FC<ChatBotMessagesProps> = ({
  messages,
  messagesEndRef,
}) => {
  return (
    <div
      className="chatbot-messages"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {messages.map((message, index) => (
        <ChatBotMessage key={message.id} message={message} index={index} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
