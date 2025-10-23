import React from 'react';

export const AnimationStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Message Slide In Animation */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Thinking Dots Animation */
      @keyframes thinking-dot {
        0%, 60%, 100% {
          opacity: 0.3;
        }
        30% {
          opacity: 1;
        }
      }

      :global(.thinking-dots) {
        display: flex !important;
        flex-direction: row !important;
        align-items: center;
        gap: 4px;
        color: #1890ff;
        font-size: 1.5em;
        line-height: 1;
      }

      :global(.thinking-dots span) {
        animation: thinking-dot 1.4s infinite;
        display: inline-block !important;
        width: auto !important;
      }

      .thinking-dots span:nth-child(1) {
        animation-delay: 0s;
      }

      .thinking-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .thinking-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }

      /* Performance optimizations */
      @media (prefers-reduced-motion: reduce) {
        :global(.chatbot-card),
        :global(.chatbot-backdrop),
        :global([role="article"]) {
          transition: none !important;
          animation: none !important;
        }
      }

      /* GPU acceleration */
      :global(.chatbot-card),
      :global(.chatbot-backdrop),
      :global(.message-bubble) {
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }
    `}</style>
  );
};
