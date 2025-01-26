import { useSession } from '@/src/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) return;

  if (!user) {
    return <Redirect href='/signIn' />;
  }

  return <Stack />;
}
