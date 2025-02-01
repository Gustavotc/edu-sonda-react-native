import React from 'react';
import { ScrollView, View } from 'react-native';
import { Badge, Button, Text, useTheme } from '@rneui/themed';
import { useClassroomDetailsController } from '@/src/hooks/controllers/classroomDetails/ClassroomDetailsController';
import ExamButton from '@/src/components/classroomDetails/examButton/ExamButton';
import CreateStudentModal from '@/src/components/classroomDetails/createStudentModal/CreateStudentModal';

const ClassroomDetails: React.FC = () => {
  const { theme } = useTheme();
  const controller = useClassroomDetailsController();

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

      <ScrollView
        style={{ flexGrow: 0, width: '100%' }}
        horizontal
        contentContainerStyle={{
          width: '100%',
          gap: theme.spacing.sm,
        }}>
        <ExamButton
          title={'1°\nBimestre'}
          active
          onPress={() => console.log('teste')}
        />

        <ExamButton
          title={'2°\nBimestre'}
          active={false}
          onPress={() => console.log('teste')}
        />

        <ExamButton
          title={'3°\nBimestre'}
          active={false}
          onPress={() => console.log('teste')}
        />

        <ExamButton
          title={'4°\nBimestre'}
          active={false}
          onPress={() => console.log('teste')}
        />
      </ScrollView>

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
