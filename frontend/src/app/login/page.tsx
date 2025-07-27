"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import api, { setToken } from '@/utils/api';
import { useAuth } from '@/store/auth';

function isAxiosError(error: unknown): error is { response?: { data?: { message?: string } } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).response === 'object'
  );
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const login = useAuth(state => state.login);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
  
      login(token);                      // Store in Zustand
      setToken(token);                   // Set Axios header
      localStorage.setItem('token', token);  // ✅ Persist in localStorage
  
      router.push('/sessions');
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed.');
      } else {
        setError('Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return <AuthForm mode="login" onSubmit={handleLogin} loading={loading} error={error} />;
};

export default LoginPage; 