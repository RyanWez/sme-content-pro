'use client';

import { useEffect } from 'react';

export default function SuppressAntdWarning() {
  useEffect(() => {
    // Suppress Ant Design v5 compatibility warning
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args: any[]) => {
      const message = String(args[0]);
      if (
        message.includes('[antd: compatible]') ||
        message.includes('antd v5 support React') ||
        message.includes('see https://u.ant.design/v5-for-19')
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
      const message = String(args[0]);
      if (
        message.includes('[antd: compatible]') ||
        message.includes('antd v5 support React') ||
        message.includes('see https://u.ant.design/v5-for-19')
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}
