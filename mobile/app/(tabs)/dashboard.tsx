import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import EntriesList from '../../components/List';
import { EntryItem } from '@/interfaces/entries';
import { FAB } from '@/components/buttons/Fab';
import { useRouter } from 'expo-router';
import { useEntries } from '@/hooks/useEntries';
import { EmptyList } from '@/components/FreshStart';

export default function Dashboard() {
  const router = useRouter();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useEntries();

  const entries = data?.pages.flatMap(page => page.entries) || [];

  //Create new entry (modal)
  const handleCreate = () => {
    router.push('/entry-modal');
  };
  
  //Edit existed entry (modal)
  const handleEdit = (item: EntryItem) => {
    router.push({
      pathname: '/entry-modal',
      params: { id: item.id }
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading entries</Text>
        </View>
      ) : entries && entries.length > 0 ? (
        <EntriesList
          data={entries}
          onPressItem={handleEdit}
          onEndReached={()=>{
            if(hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          isFetchingMore={isFetchingNextPage}
        />
      ) : (
        <EmptyList />
      )}

      <FAB onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#1A1C1E',
  },
  errorText: {
    textAlign: 'center',
    color: '#EF4444',
    marginTop: 20,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
