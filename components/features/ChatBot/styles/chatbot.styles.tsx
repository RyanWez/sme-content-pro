import React from 'react';

export const ChatBotStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Backdrop Overlay */
      :global(.chatbot-backdrop) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      :global(.chatbot-backdrop.visible) {
        opacity: 1;
        visibility: visible;
      }

      /* Swipe Indicator */
      :global(.swipe-indicator) {
        display: none;
        width: 40px;
        height: 5px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 3px;
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        transition: background 0.2s ease;
      }

      :global(.swipe-indicator:hover) {
        background: rgba(255, 255, 255, 0.6);
      }

      /* ChatBot Card */
      :global(.chatbot-card) {
        position: fixed;
        bottom: 90px;
        right: 24px;
        width: 450px;
        height: 550px;
        max-height: calc(100vh - 120px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        overflow: hidden;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      :global(.chatbot-card.visible) {
        transform: translateY(0);
        opacity: 1;
      }
    `}</style>
  );
};
