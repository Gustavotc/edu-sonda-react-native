import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from '@rneui/themed';
import { useSession } from '@/src/contexts/AuthContext';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const { signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Usuário logado.</Text>
      <Button
        title='Teste'
        onPress={signOut}
        style={{ marginTop: theme.spacing.sm }}
      />
    </View>
  );
};

export default Home;
