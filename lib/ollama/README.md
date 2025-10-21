# Ollama Integration

SME Content Pro မှာ Ollama AI ကို streaming chat အတွက် အသုံးပြုထားပါတယ်။

## Setup

1. `.env.local` file ဖန်တီးပါ:
```bash
cp .env.local.example .env.local
```

2. Ollama API key ထည့်ပါ:
```
OLLAMA_API_KEY=your_api_key_here
```

## File Structure

```
lib/ollama/
├── client.ts       # Ollama API client
├── markdown.ts     # Markdown parser
└── types.ts        # TypeScript types

hooks/
└── useOllamaChat.ts  # Chat hook

app/api/chat/
└── route.ts        # API endpoint

components/features/
└── ChatBot.tsx     # Chat UI component
```

## Features

- ✅ Real-time streaming responses
- ✅ Markdown formatting support (bold, italic, code, lists, headers)
- ✅ Animated bot icon with thinking state
- ✅ Message history
- ✅ Error handling

## Usage

ChatBot component က automatically Ollama API ကို ခေါ်ပြီး streaming response ကို ပြပါတယ်။

```typescript
import ChatBot from '@/components/features/ChatBot';

<ChatBot onClose={() => setChatOpen(false)} />
```

## Supported Models

- qwen3 (default)
- llama2
- mistral
- အခြား Ollama models

Model ကို `app/api/chat/route.ts` မှာ ပြောင်းလို့ ရပါတယ်။
