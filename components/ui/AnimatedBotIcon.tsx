'use client';

import React from 'react';

interface AnimatedBotIconProps {
    isThinking?: boolean;
    size?: number;
}

export default function AnimatedBotIcon({ isThinking = false, size = 24 }: AnimatedBotIconProps) {
    const eyeClass = isThinking ? 'thinking-eyes' : 'blinking-eyes';
    
    return (
        <div
            style={{
                width: size,
                height: size,
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {/* Antenna */}
                <circle cx="16" cy="4" r="2" fill="currentColor" />
                <line x1="16" y1="6" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                {/* Bot Head/Body */}
                <rect
                    x="6"
                    y="10"
                    width="20"
                    height="18"
                    rx="4"
                    fill="currentColor"
                />

                {/* Eyes Container */}
                <g className={eyeClass}>
                    {/* Left Eye */}
                    <ellipse
                        cx="12"
                        cy="17"
                        rx="2.5"
                        ry="3"
                        fill="white"
                        className="eye left-eye"
                    />

                    {/* Right Eye */}
                    <ellipse
                        cx="20"
                        cy="17"
                        rx="2.5"
                        ry="3"
                        fill="white"
                        className="eye right-eye"
                    />
                </g>

                {/* Mouth */}
                <path
                    d="M 12 23 Q 16 25 20 23"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                />

                {/* Left Arm */}
                <rect
                    x="3"
                    y="15"
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="currentColor"
                />

                {/* Right Arm */}
                <rect
                    x="26"
                    y="15"
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="currentColor"
                />
            </svg>

            <style jsx>{`
                /* Smooth Blinking Animation */
                @keyframes blink {
                    0%, 90%, 100% {
                        transform: scaleY(1);
                        opacity: 1;
                    }
                    93%, 96% {
                        transform: scaleY(0.1);
                        opacity: 0.8;
                    }
                }

                .blinking-eyes .eye {
                    animation: blink 4s infinite ease-in-out;
                    transform-origin: center;
                }

                .blinking-eyes .left-eye {
                    animation-delay: 0s;
                }

                .blinking-eyes .right-eye {
                    animation-delay: 0.05s;
                }

                /* Smooth Thinking Animation */
                @keyframes thinking-bounce {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-2px) scale(1.1, 0.9);
                    }
                }

                @keyframes thinking-pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                .thinking-eyes .eye {
                    animation: thinking-bounce 0.6s infinite ease-in-out, 
                               thinking-pulse 1.2s infinite ease-in-out;
                    transform-origin: center;
                }

                .thinking-eyes .left-eye {
                    animation-delay: 0s;
                }

                .thinking-eyes .right-eye {
                    animation-delay: 0.15s;
                }

                /* Smooth transitions */
                .eye {
                    transition: all 0.2s ease-in-out;
                }
            `}</style>
        </div>
    );
}
