import { useEffect } from 'react';
import { useRouter} from 'expo-router';
import { useMe } from './useAuth';
import { useUserStorage } from './useUserStorage';

export function useRequireAuth() {
  const router = useRouter();
   // Fetch current user from server
  const { data: user, isLoading, isFetching } = useMe();
  // Get locally stored user (Zustand)
  const storedUser = useUserStorage((state) => state.user);

  useEffect(() => {
    if (!isLoading && !user && !isFetching && !storedUser) {
      router.replace('/');
    }
  }, [isLoading, user, router , isFetching, storedUser]);

  return { user:user || storedUser, loading: isLoading || isFetching };
}
