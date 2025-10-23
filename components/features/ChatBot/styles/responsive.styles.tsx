import React from 'react';

export const ResponsiveStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Laptop အသေး (1024px - 1366px) */
      @media (max-width: 1366px) {
        :global(.chatbot-card) {
          width: 400px;
          height: 500px;
          right: 16px;
          bottom: 80px;
        }
      }

      /* Tablet (768px - 1023px) */
      @media (max-width: 1023px) {
        :global(.chatbot-card) {
          width: 380px;
          height: 480px;
          right: 12px;
          bottom: 70px;
        }
      }

      /* Mobile Landscape & Small Tablet (640px - 767px) */
      @media (max-width: 767px) {
        :global(.chatbot-card) {
          width: calc(100vw - 24px);
          height: calc(100vh - 100px);
          max-height: 500px;
          right: 12px;
          left: 12px;
          bottom: 70px;
          border-radius: 16px;
        }

        :global(.chatbot-header) {
          border-radius: 16px 16px 0 0;
        }

        :global(.message-bubble) {
          max-width: calc(100% - 48px) !important;
          font-size: 14px;
        }

        :global(.ant-avatar) {
          width: 36px !important;
          height: 36px !important;
          min-width: 36px !important;
        }
      }

      /* Mobile Portrait (< 640px) - Full Screen Experience */
      @media (max-width: 639px) {
        :global(.chatbot-backdrop) {
          backdrop-filter: blur(0);
          -webkit-backdrop-filter: blur(0);
          background: rgba(0, 0, 0, 0.3);
        }

        :global(.swipe-indicator) {
          display: block;
          top: 8px;
        }

        :global(.chatbot-card) {
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          max-height: 100vh;
          max-height: 100dvh;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(100%);
        }

        :global(.chatbot-card.visible) {
          transform: translateY(0);
        }

        :global(.chatbot-header) {
          padding: max(12px, env(safe-area-inset-top)) 16px 12px !important;
          padding-top: calc(max(12px, env(safe-area-inset-top)) + 16px) !important;
          border-radius: 20px 20px 0 0;
        }

        :global(.chatbot-messages) {
          padding: 12px !important;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          overscroll-behavior-y: contain;
        }

        :global(.chatbot-input) {
          padding: 12px !important;
          padding-bottom: max(12px, env(safe-area-inset-bottom)) !important;
        }

        :global(.message-bubble) {
          max-width: calc(100vw - 80px) !important;
          font-size: 15px;
          line-height: 1.5;
        }

        /* Better touch targets */
        :global(.ant-btn) {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
        }

        /* Larger input area */
        :global(.ant-input) {
          font-size: 16px !important;
          padding: 10px 12px !important;
          touch-action: manipulation;
        }

        :global(.ant-input:focus) {
          font-size: 16px !important;
        }

        /* Optimize animations for mobile */
        :global(.chatbot-card.visible),
        :global(.chatbot-backdrop.visible) {
          will-change: transform, opacity;
        }

        /* Better tap highlight */
        :global(.ant-btn),
        :global(.message-bubble) {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        }

        /* Disable text selection on header */
        :global(.chatbot-header) {
          -webkit-user-select: none;
          user-select: none;
        }

        /* Prevent pull-to-refresh */
        :global(.chatbot-messages) {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
      }

      /* Very Small Mobile (< 375px) */
      @media (max-width: 374px) {
        :global(.chatbot-card) {
          width: 100vw;
          height: 100vh;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          border-radius: 16px 16px 0 0;
        }

        :global(.chatbot-header) {
          padding: 10px 12px !important;
          padding-top: calc(max(10px, env(safe-area-inset-top)) + 14px) !important;
          border-radius: 16px 16px 0 0;
        }

        :global(.chatbot-messages) {
          padding: 10px !important;
        }

        :global(.message-bubble) {
          max-width: calc(100vw - 70px) !important;
          font-size: 14px;
          padding: 8px 12px !important;
        }

        :global(.ant-avatar) {
          width: 32px !important;
          height: 32px !important;
          min-width: 32px !important;
        }
      }

      /* Landscape mode optimization */
      @media (max-width: 639px) and (orientation: landscape) {
        :global(.chatbot-card) {
          height: 100vh;
        }

        :global(.chatbot-messages) {
          max-height: calc(100vh - 140px);
        }
      }
    `}</style>
  );
};
