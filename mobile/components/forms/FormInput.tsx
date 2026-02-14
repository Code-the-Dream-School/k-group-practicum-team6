import { TextInput, Text, View, StyleSheet, Pressable, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface FormInputProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  textContentType?: string;
}

const TEXT_COLOR = Colors.gray[900];
const PLACEHOLDER_COLOR = Colors.gray[400];

// textInput fields validator  reusable for all fields
export default function FormInput({
  control,
  name,
  placeholder,
  secureTextEntry,
}: FormInputProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 10 }}>
          <View style={[styles.inputContainer, error && { borderColor: Colors.error, borderWidth: 1.5 }]}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              style={[styles.input, { color: TEXT_COLOR }, Platform.OS === 'web' ? { outline: 'none', boxShadow: 'none' } : {},]}
            />
            {secureTextEntry && (
              <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.icon}>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color={Colors.gray[500]} />
              </Pressable>
            )}
          </View>
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,

  },
  icon: {
    marginLeft: 10,
  },
  error: {
    color: Colors.error,
    marginTop: 4,
    fontSize: 12,
  },
});
