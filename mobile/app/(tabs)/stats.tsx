import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStats } from '@/hooks/useStats';

export default function Stats() {
    const { data: stats, isLoading, error } = useStats();



    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }
    const noStats =
        !stats ||
        (stats.timeSpent.hours === 0 &&
            stats.timeSpent.minutes === 0 &&
            stats.averageFocus === 0 &&
            !stats.overallMood);

    if (error || noStats) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.emptyText}>
                    {error ? 'Error loading stats' : 'No Stats Yet'}
                </Text>
            </View>
        );
    }

    const totalTime = `${stats.timeSpent.hours}h ${stats.timeSpent.minutes}m`;
    const avgFocus = `${stats.averageFocus}/5`;
    const mood = stats.overallMood ?? '—';

    return (
        <View style={styles.container}>
            <View style={styles.cards}>
                <StatCard
                    iconName="time-outline"
                    title="Time Spent"
                    value={totalTime}
                    subtitle="Total study time"
                    accent="#22C55E"
                    bg="#ECFDF5"
                />
                <StatCard
                    iconName="stats-chart-outline"
                    title="Average Focus"
                    value={avgFocus}
                    subtitle="Across all sessions"
                    accent="#3B82F6"
                    bg="#EFF6FF"
                />
                <StatCard
                    iconName="happy-outline"
                    title="Overall Mood"
                    value={mood}
                    subtitle="Most common this week"
                    accent="#A855F7"
                    bg="#F5F3FF"
                />
            </View>
        </View>
    );
}

function StatCard({
    iconName,
    title,
    value,
    subtitle,
    accent,
    bg,
}: {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    value: string;
    subtitle: string;
    accent: string;
    bg: string;
}) {
    return (
        <View style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: bg }]}>
                <Ionicons name={iconName} size={20} color={accent} />
            </View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#64748B',
    },
    cards: { gap: 12 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardTitle: { fontSize: 14, color: '#374151', fontWeight: '500' },
    cardValue: { fontSize: 28, fontWeight: '700', marginTop: 4 },
    cardSubtitle: { marginTop: 4, fontSize: 12, color: '#6B7280' },
});
