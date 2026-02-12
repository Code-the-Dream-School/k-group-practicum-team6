import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


//
export function EmptyList() {
  return (
    <View style={styles.container}>
      <Ionicons name="book-outline" size={80} color="#CBD5E1" />
      <Text style={styles.title}>No entries yet</Text>
      <Text style={styles.subtitle}>
        Your learning journal is empty. Tap the `+` button to record your first session!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#475569',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});