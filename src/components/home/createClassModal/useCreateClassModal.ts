import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createClassSchema,
  ICreateClassSchema,
} from '@/src/validators/schemas/CreateClassSchema';
import { useSession } from '@/src/contexts/AuthContext';
import { useState } from 'react';
import makeCreateClassAndDefaultExams from '@/src/factories/usecases/CreateClassAndDefaultExamsFactory';
import { IClass } from '@/src/domain/entities/Classes';

type Props = {
  handleClose: () => void;
  onNewClass: (classroom: IClass) => void;
};

export const useCreateClassModal = ({ handleClose, onNewClass }: Props) => {
  const { user } = useSession();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateClassSchema>({
    resolver: zodResolver(createClassSchema),
    mode: 'onChange',
    defaultValues: {
      year: new Date().getFullYear(),
    },
  });

  const onSubmitSuccess = async (data: ICreateClassSchema) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const classroom = await makeCreateClassAndDefaultExams().execute({
        ...data,
        teacherId: user.id,
      });
      console.log(classroom);
      onNewClass(classroom);
      handleClose();
    } catch {
      // TODO - Adicionar Toast
      console.log('Falha ao criar turma');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = handleSubmit(onSubmitSuccess);

  return { control, errors, loading, isValid, handleCreateClass };
};
