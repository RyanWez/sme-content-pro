import React from 'react';

export const MarkdownStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Markdown Styles - Optimized */
      :global(.ant-card-body strong) {
        font-weight: 700;
        color: #262626;
      }

      :global(.ant-card-body em) {
        font-style: italic;
        color: #595959;
      }

      :global(.ant-card-body code) {
        background: #f5f5f5;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', Consolas, monospace;
        font-size: 0.9em;
        color: #d63384;
      }

      :global(.ant-card-body ul) {
        margin: 4px 0;
        padding-left: 20px;
        list-style-type: disc;
        list-style-position: outside;
      }

      :global(.ant-card-body ol) {
        margin: 4px 0;
        padding-left: 20px;
        list-style-type: decimal;
        list-style-position: outside;
      }

      :global(.ant-card-body li) {
        margin: 4px 0;
        line-height: 1.6;
        padding-left: 8px;
        word-break: keep-all;
        overflow-wrap: break-word;
        word-wrap: break-word;
        white-space: normal;
      }

      :global(.ant-card-body h1),
      :global(.ant-card-body h2),
      :global(.ant-card-body h3) {
        margin: 8px 0 4px 0;
        font-weight: 600;
        line-height: 1.4;
        color: #262626;
      }

      :global(.ant-card-body h1) {
        font-size: 1.2em;
      }

      :global(.ant-card-body h2) {
        font-size: 1.1em;
      }

      :global(.ant-card-body h3) {
        font-size: 1.05em;
      }

      :global(.ant-card-body p) {
        margin: 2px 0;
        line-height: 1.6;
        color: #262626;
        word-break: keep-all;
        overflow-wrap: break-word;
        word-wrap: break-word;
        white-space: pre-wrap;
      }

      :global(.ant-card-body p:first-child) {
        margin-top: 0;
      }

      :global(.ant-card-body p:last-child) {
        margin-bottom: 0;
      }

      /* Base font size */
      :global(.ant-card-body) {
        font-size: 14px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: keep-all;
      }

      /* Message bubble text wrapping */
      :global(.message-bubble) {
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: keep-all;
        white-space: pre-wrap;
        line-height: 1.6;
      }

      /* Bot message content (markdown) - Only for bot messages */
      :global(.message-bubble > div:not(.thinking-dots):not(.user-message-text)) p {
        margin: 2px 0;
        line-height: 1.6;
        color: #262626;
        word-break: keep-all;
        overflow-wrap: break-word;
        word-wrap: break-word;
        white-space: pre-wrap;
      }

      :global(.message-bubble > div:not(.thinking-dots):not(.user-message-text)) p:first-child {
        margin-top: 0;
      }

      :global(.message-bubble > div:not(.thinking-dots):not(.user-message-text)) p:last-child {
        margin-bottom: 0;
      }

      /* User message text - Keep inline */
      :global(.user-message-text) {
        display: inline !important;
        word-break: keep-all;
        overflow-wrap: break-word;
        word-wrap: break-word;
        white-space: pre-wrap;
        line-height: 1.6;
        word-spacing: normal;
      }

      /* Better spacing between elements */
      :global(.ant-card-body > *:not(:last-child)) {
        margin-bottom: 4px;
      }

      /* Table Wrapper - Scrollable Container */
      :global(.table-wrapper) {
        width: 100%;
        overflow-x: auto;
        margin: 8px 0;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
      }

      :global(.table-wrapper::-webkit-scrollbar) {
        height: 6px;
      }

      :global(.table-wrapper::-webkit-scrollbar-track) {
        background: #f5f5f5;
        border-radius: 3px;
      }

      :global(.table-wrapper::-webkit-scrollbar-thumb) {
        background: #d9d9d9;
        border-radius: 3px;
      }

      :global(.table-wrapper::-webkit-scrollbar-thumb:hover) {
        background: #bfbfbf;
      }

      /* Table Styles */
      :global(.table-wrapper table) {
        width: 100%;
        min-width: 400px;
        border-collapse: collapse;
        margin: 0;
        font-size: 0.85em;
        background: white;
      }

      :global(.table-wrapper table thead),
      :global(.table-wrapper table tbody) {
        display: table;
        width: 100%;
        table-layout: auto;
      }

      :global(.table-wrapper table thead) {
        background: #f0f5ff;
      }

      :global(.table-wrapper table th) {
        padding: 8px 10px;
        text-align: left;
        font-weight: 600;
        color: #1890ff;
        border-bottom: 2px solid #d6e4ff;
        font-size: 0.9em;
        white-space: nowrap;
      }

      :global(.table-wrapper table td) {
        padding: 8px 10px;
        border-bottom: 1px solid #f0f0f0;
        color: #262626;
        line-height: 1.6;
        vertical-align: top;
        min-width: 80px;
      }

      :global(.table-wrapper table tbody tr:hover) {
        background: #fafafa;
      }

      :global(.table-wrapper table tbody tr:last-child td) {
        border-bottom: none;
      }
    `}</style>
  );
};
