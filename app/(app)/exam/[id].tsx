import React from 'react';
import { useExamDetailsController } from '@/src/hooks/controllers/examDetails/ExamDetailsController';
import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExameDetails: React.FC = () => {
  const controller = useExamDetailsController();

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text
        h4
        style={{
          textAlign: 'center',
        }}>{`${controller.getExamBimester(controller.examInfo?.date ?? new Date())}° bimestre`}</Text>
    </SafeAreaView>
  );
};

export default ExameDetails;
