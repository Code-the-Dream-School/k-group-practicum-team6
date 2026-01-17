import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import FormInput from './FormInput';
import { login, register } from '../../utils/authApi';

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const defaultValues = { isLogin: true, name: '', email: '', password: '', confirmPassword: '' };
  

  //Form validation schema
  const schema = yup.object({
    isLogin: yup.boolean(),
    name: yup.string().when('isLogin', (isLoginValue, schema) =>
      isLoginValue ? schema.notRequired() : schema.required('Name is required')
    ),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(6, 'Min 6 chars'),
    confirmPassword: yup.string().when('isLogin', (isLoginValue, schema) =>
      isLoginValue
        ? schema.notRequired()
        : schema.oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password')
    ),
  });
   

  // form control 
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  
  // form submit function
  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await login({ email: data.email, password: data.password });
        router.replace('/dashboard');
      } else {
        await register({ name: data.name, email: data.email, password: data.password });
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
      <FormInput control={control} name="email" placeholder="Email"/>
      <FormInput control={control} name="password" placeholder="Password" secureTextEntry />
      {!isLogin && <FormInput control={control} name="confirmPassword" placeholder="Confirm Password" secureTextEntry />}
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
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
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#3b82f6', marginTop: 16, textAlign: 'center' },
});


