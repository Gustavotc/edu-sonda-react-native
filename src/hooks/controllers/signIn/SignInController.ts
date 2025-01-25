import { router } from 'expo-router';
import { useState } from 'react';

export const useSignInController = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(value)) {
      setEmailError('');
    } else {
      setEmailError('Por favor, insira um e-mail válido.');
    }
  };

  const handleRegister = () => {
    router.navigate('/register');
  };

  const handleEmailChange = (value: string) => {
    validateEmail(value);
    setEmail(value);
  };

  return { email, emailError, handleEmailChange, handleRegister };
};
