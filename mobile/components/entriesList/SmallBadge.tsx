import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";


export default function SmallBadge({
    text,
    variant = 'focus',
}: {
    text: string;
    variant?: 'mood' | 'focus';
}) {
    let badgeStyle = {};
    let textStyle = {};

    if (variant === 'mood') {
        const moodColor = Colors.moods[text as keyof typeof Colors.moods] || Colors.moods['Okay'];
        badgeStyle = { backgroundColor: moodColor.background };
        textStyle = { color: moodColor.text };
    } else {
        badgeStyle = badgeStyles.focus;
        textStyle = badgeStyles.focusText;
    }

    return (
        <View style={[badgeStyles.base, badgeStyle]}>
            <Text style={[badgeStyles.text, textStyle]}>{text}</Text>
        </View>
    );
}

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
    focus: { backgroundColor: Colors.brandBackground },
    focusText: { color: Colors.brand },
});