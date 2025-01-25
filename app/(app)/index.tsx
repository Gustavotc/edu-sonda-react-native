import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from '@rneui/themed';

const Home: React.FC = () => {
  const { theme } = useTheme();

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
        onPress={() => console.log('teste')}
        style={{ marginTop: theme.spacing.sm }}
      />
    </View>
  );
};

export default Home;
