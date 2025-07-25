"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import api, { setToken } from '@/utils/api';
import { useAuth } from '@/store/auth';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const login = useAuth(state => state.login);

  const handleSignup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/signup', { email, password });
      login(res.data.token);
      setToken(res.data.token);
      router.push('/sessions');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} error={error} />;
};

export default SignupPage; 