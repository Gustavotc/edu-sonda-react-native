import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme, Text, Button } from '@rneui/themed';
import ProfileTopBar from '@/src/components/home/profileTopBar/ProfileTopBar';
import { useHomeController } from '@/src/hooks/controllers/home/HomeController';
import EmptyListHome from '@/src/components/home/emptyListHome/EmptyListHome';
import CreateClassModal from '@/src/components/home/createClassModal/CreateClassModal';

const Home: React.FC = () => {
  const { theme } = useTheme();

  const controller = useHomeController();

  const renderItem = () => {
    return <View />;
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}>
      <ProfileTopBar />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: theme.spacing.xl,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 24,
          }}>
          Turmas
        </Text>

        <Button
          title='Nova turma'
          size='sm'
          type='outline'
          onPress={controller.handleCreateClass}
        />
      </View>

      <FlatList
        data={[]}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyListHome handleCreateClass={controller.handleCreateClass} />
        }
      />

      {controller.showNewClassModal && (
        <CreateClassModal
          handleClose={controller.handleCloseCreateClassModal}
        />
      )}
    </View>
  );
};

export default Home;
