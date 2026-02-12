import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BlurTabBarbackground from '@/components/TabBarBackground';
import { View, ActivityIndicator, Platform } from 'react-native';
import { useRequireAuth } from '../../hooks/userRequireAuth';
import { useUserStorage } from '../../hooks/useUserStorage';
import { UserState } from '@/interfaces/auth';

export default function TabsLayout() {
    const { loading } = useRequireAuth();
    const user = useUserStorage((state: UserState) => state.user);
    if (loading && !user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <Tabs screenOptions={{
            lazy: false,
            tabBarActiveTintColor: '#3B82F6',
            // Custom blurred background for the tab bar
            tabBarBackground: BlurTabBarbackground,
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
            },
            tabBarStyle: Platform.select({
                ios: {
                    position: 'absolute',
                    height: 90,
                    paddingTop: 10,
                    paddingBottom: 25,
                    borderTopWidth: 0,
                    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
                },
                default: {
                    position: 'absolute',
                    height: 70,
                    paddingTop: 8,
                    paddingBottom: 8,
                    backgroundColor: '#FFFFFF',
                    elevation: 8,
                },
            }),
            headerShown: true,
        }}>
            <Tabs.Screen
                name="dashboard"
                options={{ title: 'Home', headerTitle: `Hello, ${user?.name || 'User'}`, tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} /> }}
            />
            <Tabs.Screen
                name="stats"
                options={{ title: 'Stats', headerTitle: `${user?.name || 'User'}, Stats`, freezeOnBlur: true, tabBarIcon: ({ size, color }) => <Ionicons name="bar-chart" size={size} color={color} /> }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: 'Profile', headerTitle: `${user?.name || 'User'} Profile`, freezeOnBlur: true, tabBarIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} /> }}
            />
        </Tabs>
    );
}
