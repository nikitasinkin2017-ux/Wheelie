import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { WheelieProvider } from '@/data/wheelie-store';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <WheelieProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="training/create" options={{ headerShown: false }} />
          <Stack.Screen name="training/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Окно' }} />
        </Stack>
        <StatusBar style="light" />
      </WheelieProvider>
    </ThemeProvider>
  );
}
