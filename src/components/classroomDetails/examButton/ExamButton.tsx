import { Button } from '@rneui/themed';
import React from 'react';

type Props = {
  title: string;
  onPress: () => void;
  active: boolean;
};

const ExamButton: React.FC<Props> = ({ title, active, onPress }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      type='outline'
      buttonStyle={{ width: 75, height: 50, borderRadius: 4 }}
      titleStyle={{ fontSize: 12 }}
      disabled={!active}
    />
  );
};

export default ExamButton;
