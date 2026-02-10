import { User } from '../interfaces/auth';
import { useGetUser } from './useUserStorage';

export function useAuthUser(): User | null {
   const user = useGetUser();
  return user as User;
}
