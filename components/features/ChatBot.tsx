'use client';

import { ChatBotContainer } from './ChatBot/ChatBotContainer';

interface ChatBotProps {
    onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
    return <ChatBotContainer onClose={onClose} />;
}
