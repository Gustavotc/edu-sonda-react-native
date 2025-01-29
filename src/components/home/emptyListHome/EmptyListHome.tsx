import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from '@rneui/themed';

type Props = {
  handleCreateClass: () => void;
};

const EmptyListHome: React.FC<Props> = ({ handleCreateClass }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 16,
          textAlign: 'center',
        }}>
        Assim que você cadastrar uma turma, ela será listada aqui.
      </Text>

      <Button
        title='Cadastrar turma'
        buttonStyle={{ marginTop: theme.spacing.xl }}
        onPress={handleCreateClass}
      />
    </View>
  );
};

export default EmptyListHome;
