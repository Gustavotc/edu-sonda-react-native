import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from '@rneui/themed';
import TextInput from '@/src/components/textInput/TextInput';
import { useSignInController } from '@/src/hooks/controllers/signIn/SignInController';

const SignIn: React.FC = () => {
  const { theme } = useTheme();

  const controller = useSignInController();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}>
      <Text h4 style={{ marginBottom: theme.spacing.xl }}>
        Bem-Vindo!
      </Text>

      <Text style={{ marginBottom: theme.spacing.xl }}>
        Informe seu e-mail ou crie uma conta gratuita!
      </Text>

      <TextInput
        placeholder='E-mail'
        value={controller.email}
        errorMessage={controller.emailError}
        onChangeText={controller.handleEmailChange}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
      />

      <Button
        title='Entrar'
        onPress={() => console.log('Entrar')}
        buttonStyle={{ marginTop: theme.spacing.xl }}
        containerStyle={{ width: '100%' }}
      />

      <Button
        title='Criar conta gratuita'
        type='clear'
        onPress={controller.handleRegister}
        containerStyle={{ width: '100%' }}
        buttonStyle={{ marginTop: theme.spacing.xl }}
      />
    </View>
  );
};

export default SignIn;
