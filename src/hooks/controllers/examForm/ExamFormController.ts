import makeLocalStorage from '@/src/factories/localStorage/LocalStorageFactory';
import {
  examFormSchema,
  IExamFormSchema,
} from '@/src/validators/schemas/ExamFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useExameFormController = () => {
  const { id, studentId } = useLocalSearchParams<{
    id: string;
    studentId: string;
  }>();

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<IExamFormSchema>({
    resolver: zodResolver(examFormSchema),
  });

  const [disableForm, setDisableForm] = useState(false);

  const onSubmitSuccess = async (data: IExamFormSchema) => {
    const key = `${studentId}-${id}-response`;
    await makeLocalStorage().setObject(key, data);
    setDisableForm(true);
  };

  const checkForPreviousResponse = async () => {
    const prevResponse = await makeLocalStorage().getObject<IExamFormSchema>(
      `${studentId}-${id}-response`,
    );

    if (!prevResponse) return;

    setDisableForm(true);
    setValue('recognizesAlphabet', prevResponse.recognizesAlphabet);
    setValue('recognizesColors', prevResponse.recognizesColors);
    setValue('recognizesForms', prevResponse.recognizesForms);
    setValue('recognizesName', prevResponse.recognizesName);
    setValue('recognizesNumbers', prevResponse.recognizesNumbers);
    setValue('recognizesOwnBody', prevResponse.recognizesOwnBody);
  };

  useEffect(() => {
    checkForPreviousResponse();
  }, []);

  return {
    control,
    errors,
    isSubmitting,
    disableForm,
    handleSubmit: handleSubmit(onSubmitSuccess),
  };
};
