import { useSession } from '@/src/contexts/AuthContext';
import { IClassroomDetails } from '@/src/domain/entities/ClassroomDetails';
import makeFetchClassroomDetails from '@/src/factories/usecases/FetchClassroomDetailsFactory';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export const useClassroomDetailsController = () => {
  const { user } = useSession();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [classroomDetails, setClassroomDetails] =
    useState<IClassroomDetails | null>(null);

  const updateClassroomDetails = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const response = await makeFetchClassroomDetails().execute({
        teacherId: user.id,
        classroomId: Number(id),
      });
      setClassroomDetails(response);
    } catch {
      // TODO - Exibir toast
      console.log('Falha ao buscar detalhes da turma');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = () => {
    setShowCreateStudent(true);
  };

  const handleDismissCreateStudent = () => {
    setShowCreateStudent(false);
  };

  useEffect(() => {
    updateClassroomDetails();
  }, []);

  return {
    loading,
    classroomDetails,
    showCreateStudent,
    handleCreateStudent,
    handleDismissCreateStudent,
  };
};
