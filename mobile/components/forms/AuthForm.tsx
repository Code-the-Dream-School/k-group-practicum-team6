import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import FormInput from './FormInput';
import { useLogin, useRegister } from '../../hooks/useAuth';
import { authSchema } from './validation/AuthSchema';

//Authentication form component
export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const defaultValues = { isLogin: true, name: '', email: '', password: '', confirmPassword: '' };


  // form control 
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues,
  });

  // form submit function
  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await loginMutation.mutateAsync({ email: data.email, password: data.password });
        router.replace('/(tabs)/dashboard');
      } else {
        await registerMutation.mutateAsync({ name: data.name, email: data.email, password: data.password });
        alert('Registered successfully!');
        setIsLogin(true);
        setValue('isLogin', true);
        reset({ ...defaultValues, isLogin: true });
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // toggle form between login and register
  const toggleMode = () => {
    const newMode = !isLogin;
    setIsLogin(newMode);
    setValue('isLogin', newMode);
    reset({ ...defaultValues, isLogin: newMode });
  };

  return (
    <View style={{ width: '100%' }}>
      {!isLogin && <FormInput control={control} name="name" placeholder="Name" />}
      <FormInput control={control} name="email" placeholder="Email" />
      <FormInput control={control} name="password" placeholder="Password" secureTextEntry />
      {!isLogin && <FormInput control={control} name="confirmPassword" placeholder="Confirm Password" secureTextEntry />}
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Register'}</Text>
      </Pressable>
      <Pressable onPress={toggleMode}>
        <Text style={styles.link}>{isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#3b82f6', marginTop: 16, textAlign: 'center' },
});


