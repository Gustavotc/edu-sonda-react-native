import React from 'react';
import { View } from 'react-native';
import { Badge, Text, useTheme } from '@rneui/themed';
import { useClassroomDetailsController } from '@/src/hooks/controllers/classroomDetails/ClassroomDetailsController';

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
    </View>
  );
};

export default ClassroomDetails;
