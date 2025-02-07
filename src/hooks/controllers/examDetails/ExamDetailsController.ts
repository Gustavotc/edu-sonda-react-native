import { useEffect, useState } from 'react';
import { IExam } from '@/src/domain/entities/Exam';
import makeFetchExameById from '@/src/factories/usecases/FetchExamByIdFactory';
import { router, useLocalSearchParams } from 'expo-router';
import { IStudentWithExamFlag } from '@/src/domain/entities/StudentWithExamFlag';
import makeFetchStudentsWithExamFlag from '@/src/factories/usecases/FetchStudentsWithExamFlagFactory';

const getExamBimester = (date: Date): number => {
  const month = date.getMonth() + 1;

  if (month < 3) return 1;

  if (month < 5) return 2;

  if (month < 8) return 3;

  return 4;
};

export const useExamDetailsController = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [examInfo, setExamInfo] = useState<IExam | null>(null);
  const [students, setStudents] = useState<IStudentWithExamFlag[]>([]);

  const updateExamData = async () => {
    try {
      setLoading(true);
      const response = await makeFetchExameById().execute(Number(id));
      setExamInfo(response);
    } catch {
      // TODO - Exibir toast
      console.log('Falha ao buscar dados do exame');
    } finally {
      setLoading(false);
    }
  };

  const updateStudents = async () => {
    try {
      setLoading(true);
      const response = await makeFetchStudentsWithExamFlag().execute(
        Number(id),
      );
      setStudents(response);
    } catch {
      // TODO - Exibir toast
      console.log('Falha ao buscar alunos');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentPress = (student: IStudentWithExamFlag) => {
    router.navigate({
      pathname: `/(app)/exam/form/[id]`,
      params: {
        id: id,
        studentId: student.id,
      },
    });
  };

  useEffect(() => {
    Promise.all([updateStudents(), updateExamData()]);
  }, []);

  return {
    loading,
    examInfo,
    students,
    getExamBimester,
    handleStudentPress,
  };
};
