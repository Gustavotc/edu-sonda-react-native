import { SessionProvider } from '@/src/contexts/AuthContext';
import makeLocalStorage from '@/src/factories/localStorage/LocalStorageFactory';
import { ThemeProvider } from '@rneui/themed';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style='dark' />
      <SafeAreaProvider>
        <SessionProvider storage={makeLocalStorage()}>
          <Slot />
        </SessionProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
