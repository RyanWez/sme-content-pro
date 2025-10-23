'use client';

import React, { useRef } from 'react';
import { Card } from 'antd';
import { useOllamaChat } from '@/hooks/useOllamaChat';
import { ChatBotBackdrop } from './components/ChatBotBackdrop';
import { ChatBotHeader } from './components/ChatBotHeader';
import { ChatBotMessages } from './components/ChatBotMessages';
import { ChatBotInput } from './components/ChatBotInput';
import { useChatBotState } from './hooks/useChatBotState';
import { useChatBotScroll } from './hooks/useChatBotScroll';
import { useChatBotGestures } from './hooks/useChatBotGestures';
import { ChatBotStyles } from './styles/chatbot.styles';
import { ResponsiveStyles } from './styles/responsive.styles';
import { AnimationStyles } from './styles/animations.styles';
import { MarkdownStyles } from './styles/markdown.styles';
import { CLOSE_ANIMATION_DELAY } from './utils/constants';

interface ChatBotContainerProps {
  onClose: () => void;
}

export const ChatBotContainer: React.FC<ChatBotContainerProps> = ({ onClose }) => {
  const { messages, isLoading, sendMessage } = useOllamaChat();
  const { inputValue, setInputValue, isVisible, setIsVisible } = useChatBotState();
  const { messagesEndRef, scrollToBottom } = useChatBotScroll(messages);
  const chatCardRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_DELAY);
  };

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useChatBotGestures(
    chatCardRef,
    handleClose
  );

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue('');

    // Scroll to bottom immediately when sending
    requestAnimationFrame(() => {
      scrollToBottom();
    });

    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <ChatBotBackdrop isVisible={isVisible} onClick={handleClose} />

      {/* ChatBot Card */}
      <Card
        ref={chatCardRef}
        className={`chatbot-card ${isVisible ? 'visible' : ''}`}
        styles={{
          body: {
            padding: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Header */}
        <ChatBotHeader
          onClose={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {/* Messages */}
        <ChatBotMessages messages={messages} messagesEndRef={messagesEndRef} />

        {/* Input */}
        <ChatBotInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          isLoading={isLoading}
        />
      </Card>

      {/* Styles */}
      <ChatBotStyles />
      <ResponsiveStyles />
      <AnimationStyles />
      <MarkdownStyles />
    </>
  );
};
