import { create } from 'zustand';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface User {
  userId: string;
  email?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email?: string;
}

const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return { userId: decoded.userId, email: decoded.email };
  } catch {
    return null;
  }
};

export const useAuth = create<AuthState>((set: (state: Partial<AuthState>) => void) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: typeof window !== 'undefined' && localStorage.getItem('token')
    ? getUserFromToken(localStorage.getItem('token')!)
    : null,
  login: (token: string) => {
    localStorage.setItem('token', token);
    set({ token, user: getUserFromToken(token) });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
  setUser: (user: User | null) => set({ user }),
})); 