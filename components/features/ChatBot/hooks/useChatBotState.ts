import { useState, useEffect } from 'react';

export const useChatBotState = () => {
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return {
    inputValue,
    setInputValue,
    isVisible,
    setIsVisible,
  };
};
