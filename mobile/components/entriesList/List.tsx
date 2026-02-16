import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list'
import { EntryItem } from '@/interfaces/entries';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import SmallBadge from "@/components/entriesList/SmallBadge";

type Props = {
  data: EntryItem[];
  onPressItem?: (item: EntryItem) => void;
  onEndReached?: () => void;
  isFetchingMore?: boolean;
};

//Separator between
const ItemSeparator = () => <View style={{ height: 12 }} />;

//List component
export default function EntriesList({
  data,
  onPressItem,
  onEndReached,
  isFetchingMore,
}: Props) {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingMore ? <ActivityIndicator style={{ padding: 16 }} /> : null}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressItem?.(item)}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.title}>{item.subject}</Text>

          <Text style={styles.meta}>
            <Ionicons name={'calendar-outline'} size={15} color={Colors.gray[500]} /> {item.date}   <Ionicons name={'time-outline'} size={15} color={Colors.gray[500]} /> {item.durationString}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {item.details}
          </Text>

          <View style={styles.badges}>
            <SmallBadge text={item.mood} variant="mood" />
            <SmallBadge
              text={`Focus ${item.focus}/5`}
              variant="focus"
            />
          </View>
        </Pressable>
      )}
    />
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    color: Colors.gray[500],
    marginTop: 4,
  },
  description: {
    marginTop: 8,
    color: Colors.gray[700],
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
});


