import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { entrySchema } from './validation/EntrySchema';
import FormInput from './FormInput';
import { Colors } from '@/constants/Colors';

const MOODS = ["Awful", "Not Great", "Okay", "Great", "Amazing"];
const FOCUS_LEVELS = [1, 2, 3, 4, 5];

interface EntryFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    onDelete?: () => void;
    isSubmitting: boolean;
    submitButtonText: string;
}

export default function EntryForm({
    initialData,
    onSubmit,
    onDelete,
    isSubmitting,
    submitButtonText
}: EntryFormProps) {
    // Initialize react-hook-form with Yup validation
    const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(entrySchema),
        defaultValues: {
            subject: '',
            duration: 0,
            mood: 'Okay',
            focus: 3,
            details: '',
        },
    });

    //initial data changes
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    // Watch duration field (stored in minutes)
    const currentDuration = watch('duration') || 0;

    // Convert minutes to hours and minutes
    const hours = Math.floor(currentDuration / 60);
    const minutes = currentDuration % 60;

    // Update duration field when hours or minutes change
    const updateDuration = (h: number, m: number) => {
        setValue('duration', h * 60 + m, { shouldValidate: true });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' || Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : Platform.OS === 'android' ? 80 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <Text style={styles.label}>Subject</Text>
                <FormInput
                    control={control}
                    name="subject"
                    placeholder="What did you learn?"
                />

                <Text style={styles.label}>Duration</Text>
                <View style={styles.durationContainer}>
                    <View style={styles.timeInputBlock}>
                        <TextInput
                            style={styles.timeInput}
                            keyboardType="numeric"
                            placeholder="0"
                            value={hours === 0 ? '' : String(hours)}
                            onChangeText={(t) => {
                                const num = t === '' ? 0 : Number(t);
                                updateDuration(num, minutes);
                            }}
                        />
                        <Text>hrs</Text>
                    </View>
                    <View style={styles.timeInputBlock}>
                        <TextInput
                            style={styles.timeInput}
                            keyboardType="numeric"
                            placeholder="0"
                            value={minutes === 0 ? '' : String(minutes)}
                            onChangeText={(t) => {
                                const num = t === '' ? 0 : Number(t);
                                updateDuration(hours, num);
                            }}
                        />
                        <Text>min</Text>
                    </View>
                </View>
                {errors.duration && (
                    <Text style={{ color: Colors.error, fontSize: 12, marginTop: 4 }}>
                        {errors.duration.message}
                    </Text>
                )}
                <Text style={styles.label}>Mood</Text>
                <Controller
                    control={control}
                    name="mood"
                    render={({ field: { value, onChange } }) => (
                        <View style={styles.chipsContainer}>
                            {MOODS.map((m) => {
                                const isSelected = value === m;
                                const moodColors = Colors.moods[m as keyof typeof Colors.moods];

                                return (
                                    <Pressable
                                        key={m}
                                        style={[
                                            styles.chip,
                                            isSelected && {
                                                backgroundColor: moodColors?.background || styles.activeChip.backgroundColor,
                                                borderColor: moodColors?.text || styles.activeChip.borderColor,
                                                borderWidth: 1
                                            }
                                        ]}
                                        onPress={() => onChange(m)}
                                    >
                                        <Text style={[
                                            styles.chipText,
                                            isSelected && {
                                                color: moodColors?.text || styles.activeChipText.color,
                                                fontWeight: 'bold'
                                            }
                                        ]}>{m}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    )}
                />

                <Text style={styles.label}>Focus</Text>
                <Controller
                    control={control}
                    name="focus"
                    render={({ field: { value, onChange } }) => (
                        <View style={styles.chipsContainer}>
                            {FOCUS_LEVELS.map((f) => (
                                <Pressable
                                    key={f}
                                    style={[styles.circleChip, value === f && styles.activeChip]}
                                    onPress={() => onChange(f)}
                                >
                                    <Text style={[styles.chipText, value === f && styles.activeChipText]}>{f}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                />

                <Text style={styles.label}>Details (Optional)</Text>
                <Controller
                    control={control}
                    name="details"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.textArea]}
                            placeholder="Add some notes..."
                            multiline
                            textAlignVertical="top"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Pressable
                    style={[styles.saveBtn, isSubmitting && styles.disabledBtn]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <ActivityIndicator color="#fff" /> :
                        <Text style={styles.saveBtnText}>{submitButtonText}</Text>
                    }
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContent: { padding: 20, paddingBottom: 100 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 12, color: Colors.gray[800] },
    durationContainer: { flexDirection: 'row', gap: 15 },
    timeInputBlock: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    timeInput: { borderWidth: 1, borderColor: Colors.gray[300], borderRadius: 8, padding: 10, width: 60, textAlign: 'center' },
    chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: Colors.gray[100] },
    circleChip: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.gray[100] },
    activeChip: { backgroundColor: Colors.brandLight, borderColor: Colors.brand, borderWidth: 1 },
    chipText: { color: Colors.gray[500], fontSize: 14, textTransform: 'capitalize' },
    activeChipText: { color: Colors.brand, fontWeight: 'bold' },
    textArea: { borderWidth: 1, borderColor: Colors.gray[300], borderRadius: 8, padding: 10, minHeight: 100 },
    saveBtn: { backgroundColor: Colors.brand, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 30 },
    saveBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
    disabledBtn: { opacity: 0.7 },
    deleteBtn: { marginTop: 15, alignItems: 'center', padding: 10 },
    deleteBtnText: { color: Colors.error, fontWeight: '600' }
});
