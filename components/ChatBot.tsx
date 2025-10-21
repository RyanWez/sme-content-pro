'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Avatar, Space, Typography } from 'antd';
import { SendOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import AnimatedBotIcon from './AnimatedBotIcon';

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatBotProps {
    onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'မင်္ဂလာပါ! ကျွန်တော် SME Content Pro AI Assistant ပါ။ ဘယ်လိုကူညီပေးရမလဲ?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: messages.length + 2,
                text: 'ကျေးဇူးတင်ပါတယ်။ သင့်မေးခွန်းကို လက်ခံရရှိပါပြီ။ ဒီ feature ကို မကြာခင် ထည့်သွင်းပေးပါမယ်။',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Card
            style={{
                position: 'fixed',
                bottom: 90,
                right: 24,
                width: 380,
                height: 500,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 16,
                overflow: 'hidden',
            }}
            styles={{
                body: {
                    padding: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#1890ff',
                    color: 'white',
                }}
            >
                <Space>
                    <Avatar
                        icon={<AnimatedBotIcon isThinking={isLoading} size={24} />}
                        style={{ backgroundColor: '#fff', color: '#1890ff' }}
                        size={40}
                    />
                    <Text strong style={{ color: 'white', fontSize: 16 }}>
                        AI Assistant
                    </Text>
                </Space>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    style={{ color: 'white' }}
                />
            </div>

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                }}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            display: 'flex',
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            marginBottom: 12,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                                gap: 8,
                                alignItems: 'flex-start',
                            }}
                        >
                            <Avatar
                                icon={
                                    message.sender === 'user' ? (
                                        <UserOutlined />
                                    ) : (
                                        <AnimatedBotIcon isThinking={false} size={24} />
                                    )
                                }
                                style={{
                                    backgroundColor: message.sender === 'user' ? '#1890ff' : '#52c41a',
                                }}
                                size={40}
                            />
                            <div
                                style={{
                                    maxWidth: 240,
                                    padding: '8px 12px',
                                    borderRadius: 8,
                                    backgroundColor: message.sender === 'user' ? '#1890ff' : 'white',
                                    color: message.sender === 'user' ? 'white' : 'black',
                                }}
                            >
                                <Text style={{ color: message.sender === 'user' ? 'white' : 'black' }}>
                                    {message.text}
                                </Text>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <Avatar
                                icon={<AnimatedBotIcon isThinking={true} size={24} />}
                                style={{ backgroundColor: '#14b4f3ff' }}
                                size={40}
                            />
                            <div
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: 8,
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                }}
                            >
                                <Text>Typing...</Text>
                                <span className="typing-dots">
                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
                style={{
                    padding: '12px',
                    borderTop: '1px solid #f0f0f0',
                    backgroundColor: 'white',
                }}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <TextArea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="မက်ဆေ့ခ်ျရေးပါ..."
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        style={{ resize: 'none' }}
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                    />
                </Space.Compact>
            </div>

            {/* Typing Dots Animation */}
            <style jsx>{`
        @keyframes typingDot {
          0%, 60%, 100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }

        .typing-dots span {
          animation: typingDot 1.4s infinite;
        }

        .typing-dots span:nth-child(1) {
          animation-delay: 0s;
        }

        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
        </Card>
    );
}
