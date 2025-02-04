import { useSession } from '@/src/contexts/AuthContext';
import { IClass } from '@/src/domain/entities/Classes';
import makeFetchTeacherClasses from '@/src/factories/usecases/FetchTeacherClassesFactory';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

export const useHomeController = () => {
  const [showNewClassModal, setShowNewClassModal] = useState(false);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSession();

  const currentPage = useRef(1);
  const hasMoreClassesToFetch = useRef(false);

  const handleCreateClass = () => {
    setShowNewClassModal(true);
  };

  const handleCloseCreateClassModal = () => {
    setShowNewClassModal(false);
  };

  const updateClasses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await makeFetchTeacherClasses().execute({
        page: 1,
        teacherId: user?.id,
        limit: 10,
      });

      hasMoreClassesToFetch.current = response.totalPages > currentPage.current;

      if (currentPage.current === 1) {
        setClasses(response.data);
      } else {
        setClasses((oldState) => [...oldState, ...response.data]);
      }
    } catch {
      // TODO - Mostrar toast
      console.log('Error ao listar turmas');
    } finally {
      setLoading(false);
    }
  };

  const handleClassPress = (classroom: IClass) => {
    router.navigate({
      pathname: '/classroom/[id]',
      params: { id: classroom.id },
    });
  };

  const onNewClassroom = (classroom: IClass) => {
    setClasses((state) => [...state, classroom]);
  };

  useEffect(() => {
    updateClasses();
  }, []);

  return {
    showNewClassModal,
    classes,
    loading,
    handleCreateClass,
    handleCloseCreateClassModal,
    handleClassPress,
    onNewClassroom,
  };
};
