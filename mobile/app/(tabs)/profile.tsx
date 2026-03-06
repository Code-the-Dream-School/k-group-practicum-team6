import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useLogout } from '../../hooks/useAuth';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Colors } from '@/constants/Colors';
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
                <Text style={styles.value}>{user.role}</Text>
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
        backgroundColor: Colors.gray[50],
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    label: {
        color: Colors.gray[500],
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
        backgroundColor: Colors.red,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    logoutText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
