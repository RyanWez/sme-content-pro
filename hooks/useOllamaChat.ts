import { useState, useCallback } from 'react';
import { Message, ChatMessage } from '@/lib/ollama/types';

export function useOllamaChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'မင်္ဂလာပါ! ကျွန်တော် SME Content Pro AI Assistant ပါ။ ဘယ်လိုကူညီပေးရမလဲ?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(
        async (userMessage: string) => {
            if (!userMessage.trim()) return;

            // Add user message
            const newUserMessage: Message = {
                id: Date.now(),
                text: userMessage,
                sender: 'user',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, newUserMessage]);
            setIsLoading(true);

            // Create bot message placeholder
            const botMessageId = Date.now() + 1;
            const botMessage: Message = {
                id: botMessageId,
                text: '',
                sender: 'bot',
                timestamp: new Date(),
                isStreaming: true,
            };

            setMessages((prev) => [...prev, botMessage]);

            try {
                // Prepare messages for API
                const chatMessages: ChatMessage[] = messages
                    .filter((m) => !m.isStreaming)
                    .map((m) => ({
                        role: m.sender === 'user' ? 'user' : 'assistant',
                        content: m.text,
                    }));

                chatMessages.push({
                    role: 'user',
                    content: userMessage,
                });

                // Call streaming API
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: chatMessages,
                        model: 'deepseek-v3.1:671b-cloud',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to get response');
                }

                const reader = response.body?.getReader();
                const decoder = new TextDecoder();

                if (!reader) {
                    throw new Error('No response body');
                }

                let accumulatedText = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n').filter((line) => line.trim());

                    for (const line of lines) {
                        try {
                            const data = JSON.parse(line);

                            if (data.message?.content) {
                                accumulatedText += data.message.content;

                                // Update bot message with accumulated text
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === botMessageId
                                            ? { ...m, text: accumulatedText, isStreaming: !data.done }
                                            : m
                                    )
                                );
                            }

                            if (data.done) {
                                setIsLoading(false);
                            }
                        } catch (e) {
                            // Skip invalid JSON
                            continue;
                        }
                    }
                }
            } catch (error) {
                console.error('Chat error:', error);
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === botMessageId
                            ? {
                                ...m,
                                text: 'စိတ်မကောင်းပါဘူး။ အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့ပါတယ်။ ထပ်စမ်းကြည့်ပါ။',
                                isStreaming: false,
                            }
                            : m
                    )
                );
                setIsLoading(false);
            }
        },
        [messages]
    );

    return {
        messages,
        isLoading,
        sendMessage,
    };
}
