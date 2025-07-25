"use client";
import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import { Session } from '@/types';
import CodePreview from '@/components/CodePreview';
import Tabs from '@/components/Tabs';

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const res = await api.get<Session>(`/sessions/${id}`);
        setSession(res.data);
      } catch {
        setError('Failed to load session.');
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setSending(true);
    try {
      // Add user message to chat
      const newChat = [
        ...session.chatHistory,
        { role: 'user', content: prompt, timestamp: new Date().toISOString() } as const,
      ];
      // Call AI backend
      const aiRes = await api.post('/ai/generate', {
        prompt,
        chatHistory: newChat,
        code: session.code,
        uiState: session.uiState,
      });
      // Add AI message and update code
      const updatedSession: Session = {
        ...session,
        chatHistory: [
          ...newChat,
          { role: 'ai', content: 'Component generated.', timestamp: new Date().toISOString() } as const,
        ],
        code: aiRes.data,
      };
      setSession(updatedSession);
      setPrompt('');
      // Persist to backend
      await api.put(`/sessions/${id}`, {
        chatHistory: updatedSession.chatHistory,
        code: updatedSession.code,
        uiState: updatedSession.uiState,
        title: updatedSession.title,
      });
    } catch {
      setError('AI generation failed.');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p>Loading session...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!session) return <p>Session not found.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-2">{session.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Chat</h3>
          <div className="mb-4 max-h-64 overflow-y-auto bg-white rounded shadow p-3">
            {session.chatHistory.length === 0 ? (
              <p className="text-gray-400 text-center">No chat yet. Start the conversation!</p>
            ) : (
              session.chatHistory.map((msg, idx) => (
                <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={msg.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
                    {msg.role === 'user' ? 'You' : 'AI'}:
                  </span>{' '}
                  {msg.content}
                  <div className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your prompt..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
              required
              disabled={sending}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={sending || !prompt.trim()}
              aria-label="Send prompt"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Component Preview</h3>
          {(!session.code.jsx && !session.code.css) ? (
            <div className="p-4 bg-gray-100 rounded shadow text-center text-gray-400">No code to preview.</div>
          ) : (
            <CodePreview jsx={session.code.jsx} css={session.code.css} />
          )}
          <div className="mt-4">
            <Tabs jsx={session.code.jsx} css={session.code.css} />
          </div>
        </div>
      </div>
    </div>
  );
} 