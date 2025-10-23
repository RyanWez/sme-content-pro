import { useState, RefObject } from 'react';
import { SWIPE_THRESHOLD } from '../utils/constants';

export const useChatBotGestures = (
  chatCardRef: RefObject<HTMLDivElement>,
  onClose: () => void
) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY;
    setTouchEnd(currentY);

    // Visual feedback during swipe
    const diff = currentY - touchStart;
    if (diff > 0 && chatCardRef.current) {
      chatCardRef.current.style.transform = `translateY(${Math.min(diff, 100)}px)`;
    }
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEnd - touchStart;

    if (chatCardRef.current) {
      chatCardRef.current.style.transform = '';
    }

    // Close if swiped down more than threshold
    if (swipeDistance > SWIPE_THRESHOLD) {
      onClose();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
