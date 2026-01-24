import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function Stats() {
    const user = useAuthUser();
    const totalTime = '10h 0m';
    const avgFocus = '3.0/5';
    const mood = '10x!';

    return (
        <View style={styles.container}>
            <Text>{user.name} Stats</Text>
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
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 16,
    },
    cards: {
        gap: 12,
    },
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
    cardTitle: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    cardValue: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 4,
    },
    cardSubtitle: {
        marginTop: 4,
        fontSize: 12,
        color: '#6B7280',
    },
});
