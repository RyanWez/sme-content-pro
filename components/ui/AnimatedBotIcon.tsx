'use client';

import React from 'react';
import ChatBotAnimation from './ChatBotAnimation';

interface AnimatedBotIconProps {
    size?: number;
}

export default function AnimatedBotIcon({ size = 24 }: AnimatedBotIconProps) {
    return (
        <ChatBotAnimation
            size={`${size}px`}
            color="#000000"
        />
    );
}
