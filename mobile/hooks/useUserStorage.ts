import { UserState } from '@/interfaces/auth';
import { create } from 'zustand';


//Zustand store - authenticated user state globally
export const useUserStorage = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useGetUser = () => useUserStorage((state) => state.user);