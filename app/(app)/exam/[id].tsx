import React from 'react';
import { FlatList, View } from 'react-native';
import { useExamDetailsController } from '@/src/hooks/controllers/examDetails/ExamDetailsController';
import { ListItem, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IStudentWithExamFlag } from '@/src/domain/entities/StudentWithExamFlag';

const ExameDetails: React.FC = () => {
  const { theme } = useTheme();
  const controller = useExamDetailsController();

  const renderStudent = (student: IStudentWithExamFlag) => {
    return (
      <ListItem
        topDivider
        containerStyle={{ justifyContent: 'space-between' }}
        onPress={() => controller.handleStudentPress(student)}>
        <ListItem.Title>{student.name}</ListItem.Title>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ListItem.CheckBox checked={student.hasCompletedExam} />
          <ListItem.Chevron />
        </View>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text
        h4
        style={{
          textAlign: 'center',
          marginBottom: theme.spacing.xl,
        }}>
        {`${controller.getExamBimester(controller.examInfo?.date ?? new Date())}° bimestre`}
      </Text>

      <Text
        h4
        style={{
          marginBottom: theme.spacing.md,
        }}>
        Alunos
      </Text>

      <FlatList
        data={controller.students}
        renderItem={({ item }) => renderStudent(item)}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ExameDetails;
