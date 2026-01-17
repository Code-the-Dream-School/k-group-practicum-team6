import { Platform } from 'react-native';

let API_URL:string;
//switching url for web or mobile depends on the platform
if (Platform.OS === 'web') {
  // 
  API_URL = process.env.EXPO_PUBLIC_WEB_API_URL || '';
} else {
  API_URL = process.env.EXPO_PUBLIC_MOBILE_API_KEY || '';
}

export default API_URL;