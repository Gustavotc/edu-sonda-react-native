import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Badge, Button, Text, useTheme } from '@rneui/themed';
import { useClassroomDetailsController } from '@/src/hooks/controllers/classroomDetails/ClassroomDetailsController';
import ExamButton from '@/src/components/classroomDetails/examButton/ExamButton';
import CreateStudentModal from '@/src/components/classroomDetails/createStudentModal/CreateStudentModal';
import { IExam } from '@/src/domain/entities/Exam';

const ClassroomDetails: React.FC = () => {
  const { theme } = useTheme();
  const controller = useClassroomDetailsController();

  const renderExam = (item: IExam, index: number) => {
    return (
      <ExamButton
        title={`${index + 1}°\nBimestre`}
        active
        onPress={() => console.log(item)}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        marginTop: 24,
      }}>
      <Text h4 style={{ textAlign: 'center' }}>
        {controller.classroomDetails?.classroom.name}
      </Text>

      <Badge
        value={controller.classroomDetails?.classroom.step}
        badgeStyle={{ paddingHorizontal: 8 }}
      />

      <Text
        style={{
          marginTop: theme.spacing.xl,
          marginBottom: theme.spacing.md,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Sondagens
      </Text>

      <FlatList
        data={controller.exams}
        horizontal
        renderItem={({ item, index }) => renderExam(item, index)}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: theme.spacing.xl,
          marginBottom: theme.spacing.md,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Alunos
        </Text>

        <Button
          title='Novo aluno'
          size='sm'
          buttonStyle={{ width: 90 }}
          titleStyle={{ fontSize: 14 }}
          onPress={controller.handleCreateStudent}
        />
      </View>

      {controller.showCreateStudent && (
        <CreateStudentModal
          classroomId={controller.classroomDetails?.classroom.id ?? 0}
          handleClose={controller.handleDismissCreateStudent}
        />
      )}
    </View>
  );
};

export default ClassroomDetails;
