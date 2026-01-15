import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Dashboard!</Text>
      <Pressable onPress={() => router.replace('/')} style={{ padding: 10, backgroundColor: '#007bff', borderRadius: 8 }}>
        <Text style={{ color: '#fff' }}>Logout</Text>
      </Pressable>
    </View>
  );
}

