import { TextInput, Text, View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

interface FormInputProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const TEXT_COLOR = '#000';
const PLACEHOLDER_COLOR = '#000';

// textInput fields validator  reusable for all fields
export default function FormInput({ control, name, placeholder, secureTextEntry }: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 10 }}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={PLACEHOLDER_COLOR}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            style={[styles.input, { color: TEXT_COLOR }, error && { borderColor: '#EF4444', borderWidth: 1.5 }]}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    color: '#000',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});
