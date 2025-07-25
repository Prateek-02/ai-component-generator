"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';

export default function HomePage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) router.push('/sessions');
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-3xl font-bold mb-2">Welcome to the AI Component Generator</h1>
      <p className="mb-4">Sign up or log in to start generating React components with AI.</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        <Link href="/signup" className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">Sign Up</Link>
      </div>
    </div>
  );
}
