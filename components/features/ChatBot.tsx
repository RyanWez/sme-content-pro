'use client';

import React, { useRef, useEffect } from 'react';
import { Card, Input, Button, Avatar, Space, Typography } from 'antd';
import { SendOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import AnimatedBotIcon from '../ui/AnimatedBotIcon';
import { useOllamaChat } from '@/hooks/useOllamaChat';
import { parseMarkdown } from '@/lib/ollama/markdown';

const { TextArea } = Input;
const { Text } = Typography;

interface ChatBotProps {
    onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
    const { messages, isLoading, sendMessage } = useOllamaChat();
    const [inputValue, setInputValue] = React.useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;
        
        const message = inputValue;
        setInputValue('');
        await sendMessage(message);
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
                width: 450,
                height: 550,
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
                                        <AnimatedBotIcon 
                                            isThinking={message.isStreaming || false} 
                                            size={24} 
                                        />
                                    )
                                }
                                style={{
                                    backgroundColor: message.sender === 'user' ? '#1890ff' : '#fff',
                                    color: message.sender === 'user' ? '#fff' : '#1890ff',
                                }}
                                size={40}
                            />
                            <div
                                style={{
                                    maxWidth: 320,
                                    padding: '10px 14px',
                                    borderRadius: 8,
                                    backgroundColor: message.sender === 'user' ? '#1890ff' : 'white',
                                    color: message.sender === 'user' ? 'white' : 'black',
                                    overflowX: 'auto',
                                }}
                            >
                                {message.sender === 'bot' ? (
                                    <>
                                        {message.text ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: parseMarkdown(message.text),
                                                }}
                                                style={{
                                                    color: 'black',
                                                    wordBreak: 'break-word',
                                                }}
                                            />
                                        ) : (
                                            <span className="thinking-dots">
                                                <span>.</span>
                                                <span>.</span>
                                                <span>.</span>
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <Text style={{ color: 'white' }}>{message.text}</Text>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
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
                        disabled={isLoading}
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        loading={isLoading}
                    />
                </Space.Compact>
            </div>

            {/* Animations */}
            <style jsx>{`
                /* Thinking Dots Animation */
                @keyframes thinking-dot {
                    0%, 60%, 100% {
                        opacity: 0.3;
                    }
                    30% {
                        opacity: 1;
                    }
                }

                .thinking-dots {
                    display: inline-block;
                    color: #1890ff;
                    font-size: 1.5em;
                    line-height: 1;
                }

                .thinking-dots span {
                    animation: thinking-dot 1.4s infinite;
                }

                .thinking-dots span:nth-child(1) {
                    animation-delay: 0s;
                }

                .thinking-dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .thinking-dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                /* Markdown Styles - Optimized */
                :global(.ant-card-body strong) {
                    font-weight: 700;
                    color: #262626;
                }

                :global(.ant-card-body em) {
                    font-style: italic;
                    color: #595959;
                }

                :global(.ant-card-body code) {
                    background: #f5f5f5;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Courier New', Consolas, monospace;
                    font-size: 0.9em;
                    color: #d63384;
                }

                :global(.ant-card-body ul) {
                    margin: 6px 0;
                    padding-left: 0;
                    list-style-type: none;
                }

                :global(.ant-card-body li) {
                    margin: 3px 0;
                    line-height: 1.7;
                    position: relative;
                    padding-left: 0;
                    display: flex;
                    align-items: flex-start;
                    gap: 6px;
                }

                :global(.ant-card-body li::before) {
                    display: none;
                }

                :global(.ant-card-body h1),
                :global(.ant-card-body h2),
                :global(.ant-card-body h3) {
                    margin: 8px 0 4px 0;
                    font-weight: 600;
                    line-height: 1.4;
                    color: #262626;
                }

                :global(.ant-card-body h1) {
                    font-size: 1.2em;
                }

                :global(.ant-card-body h2) {
                    font-size: 1.1em;
                }

                :global(.ant-card-body h3) {
                    font-size: 1.05em;
                }

                :global(.ant-card-body p) {
                    margin: 4px 0;
                    line-height: 1.7;
                    color: #262626;
                }

                :global(.ant-card-body p:first-child) {
                    margin-top: 0;
                }

                :global(.ant-card-body p:last-child) {
                    margin-bottom: 0;
                }

                /* Base font size */
                :global(.ant-card-body) {
                    font-size: 14px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }

                /* Better spacing between elements */
                :global(.ant-card-body > *:not(:last-child)) {
                    margin-bottom: 4px;
                }

                /* Table Container - Enable horizontal scroll */
                :global(.ant-card-body) {
                    overflow-x: auto;
                }

                /* Table Styles */
                :global(.ant-card-body table) {
                    width: 100%;
                    min-width: 280px;
                    border-collapse: collapse;
                    margin: 8px 0;
                    font-size: 0.85em;
                    background: white;
                    border-radius: 4px;
                    overflow: hidden;
                    display: block;
                    overflow-x: auto;
                }

                :global(.ant-card-body table thead),
                :global(.ant-card-body table tbody) {
                    display: table;
                    width: 100%;
                    table-layout: fixed;
                }

                :global(.ant-card-body table thead) {
                    background: #f0f5ff;
                }

                :global(.ant-card-body table th) {
                    padding: 6px 8px;
                    text-align: left;
                    font-weight: 600;
                    color: #1890ff;
                    border-bottom: 2px solid #d6e4ff;
                    font-size: 0.9em;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                :global(.ant-card-body table td) {
                    padding: 6px 8px;
                    border-bottom: 1px solid #f0f0f0;
                    color: #262626;
                    line-height: 1.5;
                    word-break: break-word;
                    vertical-align: top;
                }

                :global(.ant-card-body table tbody tr:hover) {
                    background: #fafafa;
                }

                :global(.ant-card-body table tbody tr:last-child td) {
                    border-bottom: none;
                }
            `}</style>
        </Card>
    );
}
