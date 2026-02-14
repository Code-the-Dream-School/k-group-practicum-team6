import { View, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import AuthForm from '../components/forms/AuthForm';
import { Colors } from '@/constants/Colors';


export default function LoginScreen() {

  return (
    Platform.OS === 'web' ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: Colors.white }}>
        <Text style={{ fontSize: 32, marginBottom: 20, color: Colors.brandDark, fontWeight: 'bold' }}>BrainLog</Text>
        <AuthForm />
      </View>
    ) : (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: Colors.white }}>
          <Text style={{ fontSize: 32, marginBottom: 20, color: Colors.brandDark, fontWeight: 'bold' }}>BrainLog</Text>
          <AuthForm />
        </View>
      </TouchableWithoutFeedback>
    )
  );
}

