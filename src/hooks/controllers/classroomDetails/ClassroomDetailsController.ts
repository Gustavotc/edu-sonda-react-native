import { useSession } from '@/src/contexts/AuthContext';
import { IClassroomDetails } from '@/src/domain/entities/ClassroomDetails';
import { IExam } from '@/src/domain/entities/Exam';
import makeFetchClassroomDetails from '@/src/factories/usecases/FetchClassroomDetailsFactory';
import makeFetchExamsByClassroomId from '@/src/factories/usecases/FetchExamsByClassroomIdFactory';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export const useClassroomDetailsController = () => {
  const { user } = useSession();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [classroomDetails, setClassroomDetails] =
    useState<IClassroomDetails | null>(null);
  const [exams, setExams] = useState<IExam[]>([]);

  const updateClassroomDetails = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const response = await makeFetchClassroomDetails().execute({
        teacherId: user.id,
        classroomId: Number(id),
      });

      setClassroomDetails(response);

      const examsResponse = await makeFetchExamsByClassroomId().execute(
        response.classroom.id,
      );

      setExams(examsResponse.data);
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
    exams,
    handleCreateStudent,
    handleDismissCreateStudent,
  };
};
