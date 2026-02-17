import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import EntriesList from '../../components/entriesList/List';
import { EntryItem } from '@/interfaces/entries';
import { FAB } from '@/components/buttons/Fab';
import { useRouter } from 'expo-router';
import { useEntries } from '@/hooks/useEntries';
import { EmptyList } from '@/components/entriesList/EmptyList';
import { Colors } from '@/constants/Colors';

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
          <ActivityIndicator size="large" color={Colors.brand} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading entries</Text>
        </View>
      ) : entries && entries.length > 0 ? (
        <EntriesList
          key={entries[0]?.id}
          data={entries}
          onPressItem={handleEdit}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
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
    backgroundColor: Colors.gray[50],
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: Colors.gray[800],
  },
  errorText: {
    textAlign: 'center',
    color: Colors.error,
    marginTop: 20,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
