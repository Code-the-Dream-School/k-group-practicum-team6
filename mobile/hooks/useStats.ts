import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../utils/statsApi';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 2,
  });
}