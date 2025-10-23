import { useRef, useEffect } from 'react';
import { Message } from '@/lib/ollama/types';
import { SCROLL_DEBOUNCE } from '../utils/constants';

export const useChatBotScroll = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    // Debounce scroll to improve performance
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, SCROLL_DEBOUNCE);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  return {
    messagesEndRef,
    scrollToBottom,
  };
};
