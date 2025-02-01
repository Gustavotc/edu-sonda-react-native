import { useSession } from '@/src/contexts/AuthContext';
import makeCreateAndEnrollStudent from '@/src/factories/usecases/CreateAndEnrollStudentFactory';
import {
  createStudentSchema,
  ICreateStudentSchema,
} from '@/src/validators/schemas/CreateStudentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
  classroomId: number;
  handleClose: () => void;
};

export const useCreateStudentModal = ({ classroomId, handleClose }: Props) => {
  const { user } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ICreateStudentSchema>({
    mode: 'onChange',
    resolver: zodResolver(createStudentSchema),
  });

  const onSubmitSuccess = async (data: ICreateStudentSchema) => {
    if (!user) return;

    try {
      const enrollment = await makeCreateAndEnrollStudent().execute({
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        teacherId: user.id,
        classroomId,
      });

      console.log(enrollment);
      handleClose();
    } catch {
      // TODO - Exibir toast
      console.log('Falha ao criar aluno');
    }
  };

  const handleRegisterPress = handleSubmit(onSubmitSuccess);

  return { control, errors, isValid, isSubmitting, handleRegisterPress };
};
