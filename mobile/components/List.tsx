import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { FlashList } from '@shopify/flash-list'

export type EntrielItem = {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  mood: string;
  focus: number;
};

type Props = {
  data: EntrielItem[];
  onPressItem?: (item: EntrielItem) => void;
};

// badge component
const Badge = ({
  text,
  variant = 'focus',
}: {
  text: string;
  variant?: 'mood' | 'focus';
}) => {
  return (
    <View
      style={[
        badgeStyles.base,
        variant === 'mood'
          ? badgeStyles.mood
          : badgeStyles.focus,
      ]}
    >
      <Text
        style={[
          badgeStyles.text,
          variant === 'mood'
            ? badgeStyles.moodText
            : badgeStyles.focusText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

//List component
export default function EntriesList({
  data,
  onPressItem,
}: Props) {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressItem?.(item)}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.meta}>
            {item.date} · {item.duration}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.badges}>
            <Badge text={item.mood} variant="mood" />
            <Badge
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
    backgroundColor: '#fff',
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
    color: '#6B7280',
    marginTop: 4,
  },
  description: {
    marginTop: 8,
    color: '#374151',
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
});

const badgeStyles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  focus: { backgroundColor: '#EEF2FF' },
  focusText: { color: '#4F46E5' },
  mood: { backgroundColor: '#ECFDF5' },
  moodText: { color: '#059669' },
});


