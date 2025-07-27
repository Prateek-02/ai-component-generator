"use client";
import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/store/session';
import Link from 'next/link';

export default function SessionsPage() {
  const { sessions, loading, error, fetchSessions, createSession } = useSessionStore();
  const [title, setTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const session = await createSession(title);
    setCreating(false);
    setTitle('');
    if (session) {
      router.push(`/sessions/${session._id}`);
    }
  };

  const handleLogout = () => {
    // Clear token from localStorage or cookie
    localStorage.removeItem('token'); // Adjust if your key is different
    router.push('/login');
  };

  return (
    <div className="relative">
      {/* Logout button in top-right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Sessions</h2>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New session title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="px-3 py-2 border rounded w-full"
          required
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={creating || !title.trim()}
          aria-label="Create new session"
        >
          {creating ? 'Creating...' : 'Create'}
        </button>
      </form>

      {loading && <p>Loading sessions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && sessions.length === 0 && (
        <p className="text-gray-500 text-center">No sessions yet. Create your first session!</p>
      )}
      <ul className="space-y-2">
        {sessions.map(session => (
          <li
            key={session._id}
            className="p-3 bg-blue-500 rounded shadow flex justify-between items-center"
          >
            <Link href={`/sessions/${session._id}`} className="font-medium hover:underline">
              {session.title}
            </Link>
            <span className="text-xs text-black">{new Date(session.updatedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
