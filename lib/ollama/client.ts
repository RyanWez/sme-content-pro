// Ollama API Client Configuration

export interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OllamaStreamChunk {
  message?: {
    content: string;
    thinking?: boolean;
  };
  done?: boolean;
}

export class OllamaClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = 'https://ollama.com';
    this.apiKey = process.env.OLLAMA_API_KEY || '';
  }

  async *streamChat(
    model: string,
    messages: OllamaMessage[]
  ): AsyncGenerator<OllamaStreamChunk> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            yield data;
          } catch (e) {
            // Skip invalid JSON
            continue;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
