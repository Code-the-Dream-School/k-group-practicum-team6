import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getMe, logout } from '../utils/authApi';
import EntriesList, {
  EntrielItem,
} from '../components/List';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const DATA: EntrielItem[] = [
    {
      id: '1',
      title: 'React Hooks & State Management',
      date: 'Jan 13, 2026',
      duration: '3h 30m',
      description:
        'Deep dive into useReducer and custom hooks...',
      mood: '10x!',
      focus: 5,
    },
    {
      id: '2',
      title: 'React Hooks & State Management',
      date: 'Jan 13, 2026',
      duration: '3h 30m',
      description:
        'Deep dive into useReducer and custom hooks...',
      mood: '10x!',
      focus: 5,
    },
    {
      id: '3',
      title: 'React Hooks & State Management',
      date: 'Jan 13, 2026',
      duration: '3h 30m',
      description:
        'Deep dive into useReducer and custom hooks...',
      mood: '10x!',
      focus: 5,
    },
    {
      id: '4',
      title: 'React Hooks & State Management',
      date: 'Jan 13, 2026',
      duration: '3h 30m',
      description:
        'Deep dive into useReducer and custom hooks...',
      mood: '10x!',
      focus: 5,
    },
    {
      id: '5',
      title: 'React Hooks & State Management',
      date: 'Jan 13, 2026',
      duration: '3h 30m',
      description:
        'Deep dive into useReducer and custom hooks...',
      mood: '10x!',
      focus: 5,
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        if (currentUser) {
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
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    //   <Text>Welcome, {user?.name}!</Text>
    //   <Pressable onPress={handleLogout}><Text>Logout</Text></Pressable>

    // </View>
    <View style={styles.container}>
      <EntriesList
        data={DATA}
        onPressItem={(item) =>
          console.log('Pressed:', item.title)
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

