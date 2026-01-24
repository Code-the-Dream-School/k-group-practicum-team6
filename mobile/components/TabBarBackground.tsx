import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

//blurred background component
export default function BlurTabBarbackground() {
    return (
        <BlurView
            tint="systemChromeMaterial"
            intensity={20}
            style={StyleSheet.absoluteFill}
        />
    )
}

export function useBottomTabOverflow() {
    return useBottomTabBarHeight();
}