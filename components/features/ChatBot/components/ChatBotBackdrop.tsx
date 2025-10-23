import React from 'react';

interface ChatBotBackdropProps {
  isVisible: boolean;
  onClick: () => void;
}

export const ChatBotBackdrop: React.FC<ChatBotBackdropProps> = ({
  isVisible,
  onClick,
}) => {
  return (
    <div
      className={`chatbot-backdrop ${isVisible ? 'visible' : ''}`}
      onClick={onClick}
      role="button"
      aria-label="Close chat"
      tabIndex={-1}
    />
  );
};
