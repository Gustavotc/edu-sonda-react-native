import { useSession } from '@/src/contexts/AuthContext';
import { IClassroomDetails } from '@/src/domain/entities/ClassroomDetails';
import { IExam } from '@/src/domain/entities/Exam';
import { IStudent } from '@/src/domain/entities/Student';
import makeFetchClassroomDetails from '@/src/factories/usecases/FetchClassroomDetailsFactory';
import makeFetchExamsByClassroomId from '@/src/factories/usecases/FetchExamsByClassroomIdFactory';
import makeFetchStudentsByClassroomId from '@/src/factories/usecases/FetchStudentsByClassroomIdFactory';
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

      await updateStudents(response.classroom.id, response.teacher.id);
    } catch {
      // TODO - Exibir toast
      console.log('Falha ao buscar detalhes da turma');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const updateStudents = async (classroomId: number, teacherId: number) => {
    try {
      const response = await makeFetchStudentsByClassroomId().execute({
        classroomId,
        teacherId,
      });

      setClassroomDetails((state) => {
        if (!state) return null;
        return { ...state, students: response.data };
      });
    } catch {
      // TODO - Exibir toast
      console.log('Falha ao buscar alunos da turma');
    }
  };

  const onNewStudent = (student: IStudent) => {
    setClassroomDetails((oldState) => {
      if (!oldState) return null;

      return {
        ...oldState,
        students: [...(oldState?.students ?? []), student],
      };
    });
  };

  const handleCreateStudent = () => {
    setShowCreateStudent(true);
  };

  const handleDismissCreateStudent = () => {
    setShowCreateStudent(false);
  };

  const handleExamPress = (exam: IExam) => {
    router.navigate({ pathname: '/(app)/exam/[id]', params: { id: exam.id } });
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
    handleExamPress,
    onNewStudent,
  };
};
