import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { getMe, logout } from '../utils/authApi';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        if(currentUser){
          console.log(currentUser.name);
        }
        if (!currentUser) {
          router.replace('/');
        } else {
          setUser(currentUser);
        }
      } catch (err) {
        console.error(err);
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const handleLogout = () => {
    logout();
    router.replace('/');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>Welcome, {user?.name}!</Text>
      <Pressable onPress={handleLogout}><Text>Logout</Text></Pressable>
    </View>
  );
}


