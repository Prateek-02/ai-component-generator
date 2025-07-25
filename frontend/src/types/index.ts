export interface Session {
  _id: string;
  title: string;
  chatHistory: Array<{ role: 'user' | 'ai'; content: string; timestamp: string }>;
  code: { jsx: string; css: string };
  uiState?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
} 