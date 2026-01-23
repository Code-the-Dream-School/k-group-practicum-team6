import { View, Text, StyleSheet } from 'react-native';
import EntriesList, { EntrielItem } from '../../components/List';
import { useAuthUser } from '@/hooks/useAuthUser';
const DATA: EntrielItem[] = [
  {
    id: '1',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '2',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '3',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '4',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '5',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '6',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '7',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '8',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '9',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '10',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '11',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '12',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
  {
    id: '13',
    title: 'React Hooks & State Management',
    date: 'Jan 13, 2026',
    duration: '3h 30m',
    description: 'Deep dive into useReducer and custom hooks...',
    mood: '10x!',
    focus: 5,
  },
];

export default function Dashboard() {
  const user = useAuthUser();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user.name}</Text>

      <EntriesList
        data={DATA}
        onPressItem={(item) => console.log('Pressed:', item.title)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});

