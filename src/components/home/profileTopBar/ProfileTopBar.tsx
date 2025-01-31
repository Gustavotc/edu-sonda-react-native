import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Icon } from '@rneui/themed';
import { useSession } from '@/src/contexts/AuthContext';

const ProfileTopBar: React.FC = () => {
  const { theme } = useTheme();
  const { user, signOut } = useSession();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
      }}>
      <Icon name='user-circle' type='font-awesome-5' />

      <Text
        style={{
          flex: 1,
          marginLeft: theme.spacing.sm,
          fontWeight: '700',
          fontSize: 18,
        }}>
        {`Olá, ${user?.name.split(' ')[0] ?? 'Gustavo'}!`}
      </Text>

      <Icon
        name='exit-outline'
        type='ionicon'
        onPress={signOut}
        color={theme.colors.secondary}
      />
    </View>
  );
};

export default ProfileTopBar;
