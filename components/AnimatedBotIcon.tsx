'use client';

import React from 'react';

interface AnimatedBotIconProps {
    isThinking?: boolean;
    size?: number;
}

export default function AnimatedBotIcon({ isThinking = false, size = 24 }: AnimatedBotIconProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                position: 'relative',
                display: 'inline-block',
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Bot Body - Rounded Rectangle */}
                <rect
                    x="5"
                    y="9"
                    width="14"
                    height="11"
                    rx="3"
                    fill="currentColor"
                />

                {/* Antenna */}
                <rect
                    x="11"
                    y="5"
                    width="2"
                    height="4"
                    rx="1"
                    fill="currentColor"
                />
                <rect
                    x="10.5"
                    y="4"
                    width="3"
                    height="2"
                    rx="1"
                    fill="currentColor"
                />

                {/* Left Arm */}
                <rect
                    x="3"
                    y="12"
                    width="2"
                    height="5"
                    rx="1"
                    fill="currentColor"
                />

                {/* Right Arm */}
                <rect
                    x="19"
                    y="12"
                    width="2"
                    height="5"
                    rx="1"
                    fill="currentColor"
                />

                {/* Eyes Container */}
                <g className={isThinking ? 'thinking-eyes' : 'blinking-eyes'}>
                    {/* Left Eye */}
                    <rect
                        x="8.5"
                        y="13"
                        width="2.5"
                        height="3"
                        rx="1.25"
                        fill="white"
                        className="eye"
                    />

                    {/* Right Eye */}
                    <rect
                        x="13"
                        y="13"
                        width="2.5"
                        height="3"
                        rx="1.25"
                        fill="white"
                        className="eye"
                    />
                </g>
            </svg>

            <style jsx>{`
        /* Blinking Animation - Normal State (Squint effect) */
        @keyframes blink {
          0%, 92%, 100% {
            height: 3px;
            y: 13px;
          }
          94% {
            height: 1px;
            y: 14px;
          }
          96% {
            height: 3px;
            y: 13px;
          }
        }

        .blinking-eyes .eye {
          animation: blink 3s infinite ease-in-out;
        }

        /* Thinking Animation - Dots moving */
        @keyframes thinking {
          0%, 100% {
            transform: translateY(0) scaleY(1);
          }
          25% {
            transform: translateY(-2px) scaleY(1.2);
          }
          50% {
            transform: translateY(0) scaleY(0.8);
          }
        }

        .thinking-eyes .eye {
          animation: thinking 1s infinite ease-in-out;
          transform-origin: center;
        }

        .thinking-eyes .eye:first-child {
          animation-delay: 0s;
        }

        .thinking-eyes .eye:last-child {
          animation-delay: 0.2s;
        }
      `}</style>
        </div>
    );
}
