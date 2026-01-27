# Welcome to BrainLog 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

You need to create .env file wuth these lines:

# WEB API URL — the API endpoint for the web app (running in the browser).

# Replace your_port with your server’s port number:

EXPO_PUBLIC_WEB_API_URL=http://localhost:your_port/api/v1/auth

# MOBILE API URL — the API endpoint for the mobile app (running on a device or emulator).

# Replace your_ip_address with your computer’s local IP address and your_port with your server’s port number:

EXPO_PUBLIC_MOBILE_API_KEY=http://your_ip_address:your_port/api/v1/auth

## Important NOTES:

**WEB:**
- To test the mobile version in the browser, change your browser’s resolution to a mobile screen size (e.g., using dev tools device toolbar).

**MOBILE:**

- Download the Expo Go app from the Apple App Store or Google Play Store.

- Make sure your mobile device is connected to the same Wi-Fi network as your development machine.

- Scan the QR code shown in your IDE or terminal with your phone’s camera.

- This will open the project in Expo Go, allowing you to run the app on your device.

## Features

- **User Authentication**  
  Login and registration with form validation and password confirmation.

- **Persistent User Sessions**  
  Manage logged-in state with React Query and Zustand.

- **Dashboard with Entries List**  
  Scrollable list of study sessions, showing title, date, duration, mood, and focus.

- **Stats Screen**  
  Overview of total study time, average focus, and overall mood in styled cards.

- **Bottom Tab Navigation**  
  Smooth tab navigation with custom styling and blur background.

- **Responsive Layout**  
  Works on both web and mobile, with mobile keyboard handling.

- **API Integration**  
  Connects to backend for login, registration, logout, and fetching user info.

## Disclaimer

This application is currently in **beta / testing mode**.  
Some features may not work as expected, and you may encounter **bugs or incomplete functionality**.  
Use at your own discretion, and feel free to report any issues or suggestions.
