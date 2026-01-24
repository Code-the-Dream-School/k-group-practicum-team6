import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useLogout } from '../../hooks/useAuth';
import { useAuthUser } from '@/hooks/useAuthUser';
export default function Profile() {
    const logoutMutation = useLogout();
    const user = useAuthUser();

    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{user.name}</Text>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user.email}</Text>

                <Text style={styles.label}>Position</Text>
                <Text style={styles.value}>Student/Developer</Text>

                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.value}>+1(980)2335910</Text>
            </View>

            <Pressable
                onPress={() => logoutMutation.mutate()}
                style={({ pressed }) => [
                    styles.logoutButton,
                    pressed && styles.pressed,
                ]}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F7F8FA',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    label: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 4,
    },
    logoutButton: {
        marginTop: 24,
        backgroundColor: '#EF4444',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
