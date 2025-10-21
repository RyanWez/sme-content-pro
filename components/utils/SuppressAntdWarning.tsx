'use client';

import { useEffect } from 'react';

export default function SuppressAntdWarning() {
  useEffect(() => {
    // Suppress Ant Design v5 compatibility warning
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('[antd: compatible]') ||
          message.includes('antd v5 support React 16 ~ 18'))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
