import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const isLogged = false;

  if (!isLogged) {
    return <Redirect href='/signIn' />;
  }

  return <Stack />;
}
