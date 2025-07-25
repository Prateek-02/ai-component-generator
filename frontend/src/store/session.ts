/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import api from '@/utils/api';
import { Session } from '@/types';

interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  fetchSessions: () => Promise<void>;
  createSession: (title: string) => Promise<Session | null>;
  setSessions: (sessions: Session[]) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  loading: false,
  error: null,
  fetchSessions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<Session[]>('/sessions');
      set({ sessions: res.data });
    } catch (err) {
      set({ error: 'Failed to fetch sessions.' });
    } finally {
      set({ loading: false });
    }
  },
  createSession: async (title: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post<Session>('/sessions', { title });
      set((state) => ({ sessions: [res.data, ...state.sessions] }));
      return res.data;
    } catch (err) {
      set({ error: 'Failed to create session.' });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  setSessions: (sessions: Session[]) => set({ sessions }),
})); 