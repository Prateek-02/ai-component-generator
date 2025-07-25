"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';

export default function SessionsLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    } else {
      setChecking(false);
    }
  }, [token, router]);

  if (checking) return <div className="text-center py-8">Checking authentication...</div>;
  return <>{children}</>;
} 