import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// --- (Configuration remains the same) ---
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// --- (1. Register and get the push token) ---
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token); // Log the token for sending to your server
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

// --- (2. Listener for user interaction) ---
export function handleNotifications() {
  // Listener for when a user taps on a notification
  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    // The response object contains:
    // - notification: The original notification object (content, data, trigger)
    // - actionIdentifier: The ID of the action button tapped (if using custom actions)

    const data = response.notification.request.content.data;
    console.log('User tapped on notification with data:', data);

    // ⭐ TODO: Add your custom logic here, e.g., navigate to a specific screen
    // navigation.navigate('DetailsScreen', { itemId: data.itemId });
  });

  // Listener for notifications received while the app is in the foreground
  const foregroundListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received while app is in foreground:', notification);
    // You can process the notification content here if needed
  });

  // Return the listeners' clean-up functions
  return () => {
    Notifications.removeNotificationSubscription(responseListener);
    Notifications.removeNotificationSubscription(foregroundListener);
  };
}


// --- (Scheduling remains the same) ---
export async function scheduleNotification(title, body, data = {}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: null, // null means show immediately
  });
}