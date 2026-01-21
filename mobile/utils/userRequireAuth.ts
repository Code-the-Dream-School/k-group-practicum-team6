import { User } from '../interfaces/auth'
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getMe } from './authApi';

export function useRequireAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();
        if (!data) {
          router.replace('/'); // not authorized
          return;
        }
        setUser(data);
      } catch (err) {
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return { loading, user };
}
