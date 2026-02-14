import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function StatCard({
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
    card: {
        backgroundColor: Colors.white,
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
    cardTitle: { fontSize: 14, color: Colors.gray[700], fontWeight: '500' },
    cardValue: { fontSize: 28, fontWeight: '700', marginTop: 4 },
    cardSubtitle: { marginTop: 4, fontSize: 12, color: Colors.gray[500] },
})