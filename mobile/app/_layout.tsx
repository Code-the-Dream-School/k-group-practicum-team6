import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,          // auth do not need to be retry
            refetchOnWindowFocus: false, 
            staleTime: 1000 * 60 * 5, // 5 minutes fresh data
            gcTime: 1000 * 60 * 60, // 1 hour unused cashe
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}