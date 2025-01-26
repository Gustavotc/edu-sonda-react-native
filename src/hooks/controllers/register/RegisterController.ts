import { useState } from 'react';
import { useSession } from '@/src/contexts/AuthContext';
import makeRegisterTeacher from '@/src/factories/usecases/RegisterTeacherFactory';

export const useRegisterController = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const { signIn } = useSession();

  const validateName = (value: string) => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

    if (nameRegex.test(value)) {
      setNameError('');
    } else {
      setNameError('Por favor, insira um nome válido.');
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(value)) {
      setEmailError('');
    } else {
      setEmailError('Por favor, insira um e-mail válido.');
    }
  };

  const handleNameChange = (value: string) => {
    validateName(value);
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    validateEmail(value);
    setEmail(value);
  };

  const handleRegister = async () => {
    if (nameError.length | emailError.length) return;

    try {
      setLoading(true);
      const teacher = await makeRegisterTeacher().execute({
        name,
        email,
      });

      signIn(teacher);
    } catch {
      // TODO - Adicionar Toast de erro
      console.log('Erro ao registrar professor');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    emailError,
    name,
    nameError,
    enableRegisterButton: !nameError.length && !emailError.length,
    loading,
    handleNameChange,
    handleEmailChange,
    handleRegister,
  };
};
