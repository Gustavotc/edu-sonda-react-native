import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme, Text, Button, ListItem } from '@rneui/themed';
import ProfileTopBar from '@/src/components/home/profileTopBar/ProfileTopBar';
import { useHomeController } from '@/src/hooks/controllers/home/HomeController';
import EmptyListHome from '@/src/components/home/emptyListHome/EmptyListHome';
import CreateClassModal from '@/src/components/home/createClassModal/CreateClassModal';
import { IClass } from '@/src/domain/entities/Classes';

const Home: React.FC = () => {
  const { theme } = useTheme();

  const controller = useHomeController();

  const renderItem = (item: IClass) => {
    return (
      <ListItem
        containerStyle={{ marginBottom: 8, justifyContent: 'space-between' }}
        onPress={() => controller.handleClassPress(item)}>
        <ListItem.Title>{item.name}</ListItem.Title>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <ListItem.Subtitle>{item.year}</ListItem.Subtitle>
          <ListItem.Chevron />
        </View>
      </ListItem>
    );
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
          marginVertical: theme.spacing.xl,
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
        data={controller.classes}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyListHome handleCreateClass={controller.handleCreateClass} />
        }
      />

      {controller.showNewClassModal && (
        <CreateClassModal
          handleClose={controller.handleCloseCreateClassModal}
          onNewClass={controller.onNewClassroom}
        />
      )}
    </View>
  );
};

export default Home;
