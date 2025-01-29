import React from 'react';
import { Modal, Pressable } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import TextInput from '../../shared/textInput/TextInput';
import { Controller } from 'react-hook-form';
import { useCreateClassModal } from './useCreateClassModal';
import { numberRegex } from '@/src/validators/regex/regex.Utils';

type Props = {
  handleClose: () => void;
};

const CreateClassModal: React.FC<Props> = ({ handleClose }) => {
  const { theme } = useTheme();
  const controller = useCreateClassModal();

  return (
    <Modal
      transparent
      visible
      onRequestClose={handleClose}
      statusBarTranslucent>
      <Pressable
        onPress={handleClose}
        style={{
          flex: 1,
          backgroundColor: '#00000034',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}>
        <Pressable
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
          }}>
          <Text h4 style={{ marginBottom: theme.spacing.lg }}>
            Nova turma
          </Text>

          <Controller
            name='name'
            control={controller.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Informe o nome da turma'
                value={value}
                onChangeText={onChange}
                errorMessage={controller.errors.name?.message}
                label='Nome da turma'
              />
            )}
          />

          <Controller
            name='step'
            control={controller.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Informe a etapa'
                value={value}
                onChangeText={onChange}
                errorMessage={controller.errors.step?.message}
                label='Etapa'
              />
            )}
          />

          <Controller
            name='year'
            control={controller.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Informe o ano'
                value={value?.toString()}
                onChangeText={(value) => {
                  if (value && !numberRegex.test(value)) return;
                  onChange(value);
                }}
                errorMessage={controller.errors.year?.message}
                maxLength={4}
                keyboardType='number-pad'
                label='Ano'
              />
            )}
          />

          <Button
            title='Cadastrar'
            onPress={controller.handleCreateClass}
            containerStyle={{ width: '100%', marginTop: theme.spacing.lg }}
            loading={controller.loading}
            disabled={!controller.isValid}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateClassModal;
