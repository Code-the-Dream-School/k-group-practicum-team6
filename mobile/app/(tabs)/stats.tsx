import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useStats } from '@/hooks/useStats';
import { Colors } from '@/constants/Colors';
import EmptyStats from '@/components/stats/EmptyStats';
import StatCard from '@/components/stats/StatCard';

export default function Stats() {
    const { data: stats, isLoading, error } = useStats();



    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={Colors.brand} />
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
        return error ? (
            <Text style={{ color: Colors.error }}>Error loading stats</Text>) : (<EmptyStats />)
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.gray[50],
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cards: { gap: 12 },
});
