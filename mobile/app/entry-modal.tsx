import React from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator, Alert, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useCreateEntry, useUpdateEntry, useDeleteEntry, useEntry } from '@/hooks/useEntries';
import { Ionicons } from '@expo/vector-icons';
import EntryForm from '@/components/forms/EntryForm';
import { Colors } from '@/constants/Colors';

export default function EntryModal() {
  const { id: entryId } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!entryId;
  const router = useRouter();

  // Fetch entry data when editing
  const { data: initialData, isLoading: isLoadingData } = useEntry(entryId);

  //Mutations for create, update, and delete actions
  const createMutation = useCreateEntry();
  const updateMutation = useUpdateEntry();
  const deleteMutation = useDeleteEntry();

  // loading state for form submission
  const isSubmitting = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  //back to dashboard
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/dashboard');
    }
  }

  //Handle form submission
  const handleOnSubmit = (data: any) => {
    if (isEditing) {
      updateMutation.mutate({ id: entryId, data });
    } else {
      createMutation.mutate(data);
    }
  };
  
  //entry deletion with confirmation(right now mobile only)
  const handleOnDelete = () => {
    if (Platform.OS === 'web') {
      deleteMutation.mutate(entryId!);
      return;
    }
    Alert.alert("Delete Entry", `Are you sure you want to remove ${initialData?.subject}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteMutation.mutate(entryId!) }
    ]);
  };

  if (isEditing && isLoadingData) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: isEditing ? 'Edit Entry' : 'New Entry',
        headerLeft: () => (
          <Pressable onPress={goBack} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 5 })}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </Pressable>
        ),
        ...(isEditing && {
          headerRight: () => (
            <Pressable onPress={handleOnDelete} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 20 })}>
              <Ionicons name="trash" size={20} color={Colors.red} />
            </Pressable>
          ),
        }),
      }} />
      <EntryForm
        initialData={initialData}
        onSubmit={handleOnSubmit}
        onDelete={isEditing ? handleOnDelete : undefined}
        isSubmitting={isSubmitting}
        submitButtonText={isEditing ? 'Update Entry' : 'Create Entry'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  headerBtn: { color: Colors.brand, fontSize: 17 },
});