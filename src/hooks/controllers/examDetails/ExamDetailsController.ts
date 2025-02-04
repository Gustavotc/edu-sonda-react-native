import { useEffect, useState } from 'react';
import { IExam } from '@/src/domain/entities/Exam';
import makeFetchExameById from '@/src/factories/usecases/FetchExamByIdFactory';
import { useLocalSearchParams } from 'expo-router';

const getExamBimester = (date: Date): number => {
  const month = date.getMonth() + 1;

  if (month < 3) return 1;

  if (month < 5) return 2;

  if (month < 7) return 3;

  return 4;
};

export const useExamDetailsController = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [examInfo, setExamInfo] = useState<IExam | null>(null);

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

  useEffect(() => {
    updateExamData();
  }, []);

  return { loading, examInfo, getExamBimester };
};
