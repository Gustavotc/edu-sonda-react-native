import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from '@rneui/themed';
import TextInput from '@/src/components/textInput/TextInput';
import { useRegisterController } from '@/src/hooks/controllers/register/RegisterController';

const Register: React.FC = () => {
  const { theme } = useTheme();

  const controller = useRegisterController();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}>
      <Text h4 style={{ marginBottom: theme.spacing.xl }}>
        Cadastro
      </Text>

      <Text style={{ marginBottom: theme.spacing.xl }}>
        Informe seu e-mail para criar uma conta gratuita!
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
        title='Cadastrar'
        onPress={controller.handleRegister}
        buttonStyle={{ marginTop: theme.spacing.xl }}
        containerStyle={{ width: '100%' }}
      />
    </View>
  );
};

export default Register;
