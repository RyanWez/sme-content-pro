// Type definitions for Ollama integration

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamResponse {
  message?: {
    content: string;
    thinking?: boolean;
  };
  done?: boolean;
}
