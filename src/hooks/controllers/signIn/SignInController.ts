import { useSession } from '@/src/contexts/AuthContext';
import makeSignInUser from '@/src/factories/usecases/SignInUserFactory';
import { router } from 'expo-router';
import { useState } from 'react';

export const useSignInController = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useSession();

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(value)) {
      setEmailError('');
    } else {
      setEmailError('Por favor, insira um e-mail válido.');
    }
  };

  const handleSignIn = async () => {
    if (!email || emailError) return;

    try {
      setLoading(true);
      const teacher = await makeSignInUser().execute(email);
      signIn(teacher);
    } catch {
      // TODO - Adicionar Toast
      console.log('Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.navigate('/register');
  };

  const handleEmailChange = (value: string) => {
    validateEmail(value);
    setEmail(value);
  };

  return {
    email,
    emailError,
    loading,
    handleEmailChange,
    handleSignIn,
    handleRegister,
  };
};
