'use client';

import './globals.css';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { setToken } from '@/utils/api';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setToken(token); // This sets the Authorization header for axios
      }
    }
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="w-full py-4 bg-blue-600 text-white text-center text-xl font-bold shadow">
          AI Component Generator
        </header>
        <main className="max-w-4xl mx-auto py-8 px-2">{children}</main>
      </body>
    </html>
  );
}
