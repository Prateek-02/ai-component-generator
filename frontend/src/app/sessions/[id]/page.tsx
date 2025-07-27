"use client";
import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import { Session } from '@/types';
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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="flex items-center space-x-3 text-slate-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-lg font-medium">Loading session...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md">
        <div className="flex items-center space-x-3 text-red-600">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">!</span>
          </div>
          <p className="font-medium">{error}</p>
        </div>
      </div>
    </div>
  );
  
  if (!session) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 max-w-md">
        <p className="text-slate-600 font-medium text-center">Session not found.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            {session.title}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                AI Chat
              </h3>
            </div>
            
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto bg-slate-50 p-6 space-y-4">
              {session.chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-center font-medium">No chat yet. Start the conversation!</p>
                </div>
              ) : (
                session.chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-md' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-sm'
                    }`}>
                      <div className={`text-xs font-semibold mb-1 ${
                        msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {msg.role === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className={`text-xs mt-2 ${
                        msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'
                      }`}>
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t border-slate-200">
              <form onSubmit={handleSend} className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your prompt..."
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    required
                    disabled={sending}
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  disabled={sending || !prompt.trim()}
                  aria-label="Send prompt"
                >
                  {sending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                Component Preview
              </h3>
            </div>
            <div className="mt-6">
              <div className="bg-slate-50 rounded-xl p-1 border border-slate-200">
                <Tabs jsx={session.code.jsx} css={session.code.css} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}