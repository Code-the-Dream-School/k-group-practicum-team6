import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function EmptyStats() {
    return (
        <View style={styles.container}>
            <Ionicons name="stats-chart-outline" size={80} color={Colors.gray[300]} />
            <Text style={styles.emptyText}>
                No Stats Yet
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: Colors.gray[50],
    },
    emptyText: {
        fontSize: 18,
        color: Colors.gray[400],
    },
});