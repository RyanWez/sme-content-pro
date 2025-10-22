import { useState, useCallback } from 'react';
import { Message, ChatMessage } from '@/lib/ollama/types';

const SYSTEM_PROMPT = `သင်သည် SME Content Pro website အတွက် အကူအညီပေးသော AI Assistant ဖြစ်ပါတယ်။

အရေးကြီးသော စည်းမျဉ်းများ:
1. အဖြေများကို တိုတိုနဲ့ ရှင်းလင်းစွာ ပြန်ဖြေပါ (2-3 စာကြောင်း သို့မဟုတ် 3-5 bullet points)
2. အရှည်ကြီး ရှင်းပြစရာမလိုပါ - တိုတိုနဲ့ အဓိကအချက်တွေပဲ ပြောပါ
3. ဒီ website နဲ့ မသက်ဆိုင်တဲ့ မေးခွန်းတွေ သို့မဟုတ် အရှည်ကြီး ရှင်းပြရမယ့် မေးခွန်းတွေဆိုရင် "ကျွန်တော့်မှာ အကန့်အသတ်လေးတွေ ရှိနေလို့ ဒီမေးခွန်းကို အဖြေပြန်မပေးနိုင်တဲ့အတွက် တောင်းပန်ပါတယ် ခင်ဗျာ။" လို့ ပြန်ပေးပါ
4. Myanmar Unicode ဖြင့်သာ ပြန်ဖြေပါ
5. Emoji များကို သင့်လျော်သလို အသုံးပြုနိုင်ပါတယ်

Website Features:
- Blog Content Writer - ဘလော့ခ်ပို့စ် အကြောင်းအရာများ ရေးသားပေးခြင်း
- Promotion Idea - ပရိုမိုးရှင်း အကြံဉာဏ်များ ပေးခြင်း  
- Product Caption - ကုန်ပစ္စည်း caption များ ရေးပေးခြင်း`;

export function useOllamaChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'မင်္ဂလာပါ! ကျွန်တော် SME Content Pro AI Assistant ပါ။ ဘယ်လိုကူညီပေးရမလဲ? 😊',
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
                // Prepare messages for API with system prompt
                const chatMessages: ChatMessage[] = [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT,
                    },
                ];

                // Add conversation history
                messages
                    .filter((m) => !m.isStreaming)
                    .forEach((m) => {
                        chatMessages.push({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text,
                        });
                    });

                // Add current user message
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
                        model: 'kimi-k2:1t',//deepseek-v3.1:671b-cloud
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
