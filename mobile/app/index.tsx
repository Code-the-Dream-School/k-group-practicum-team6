import LoginScreen from './loginRegister';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useMe } from '../hooks/useAuth'

export default function Index() {
  const router = useRouter();
    const { data: user, isLoading } = useMe();
  
    useEffect(() => {
      if (user && !isLoading) {
        router.replace('/(tabs)/dashboard');
      }
    }, [user, isLoading, router]);
  
    if (isLoading) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }
    if (!user) {
    return <LoginScreen />;
    }
  return null;
}
