import React from 'react';
import { Modal, Pressable } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import TextInput from '../../shared/textInput/TextInput';
import { Controller } from 'react-hook-form';
import { useCreateStudentModal } from './useCreateStudentModal';
import MaskUtils from '@/src/utils/masks/MaskUtils';
import { IStudent } from '@/src/domain/entities/Student';

type Props = {
  classroomId: number;
  handleClose: () => void;
  onNewStudent: (student: IStudent) => void;
};

const CreateStudentModal: React.FC<Props> = ({
  classroomId,
  handleClose,
  onNewStudent,
}) => {
  const { theme } = useTheme();
  const controller = useCreateStudentModal({
    classroomId,
    handleClose,
    onNewStudent,
  });

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
            Novo aluno
          </Text>

          <Controller
            name='name'
            control={controller.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Informe o nome do aluno'
                value={value}
                onChangeText={onChange}
                errorMessage={controller.errors.name?.message}
                label='Nome do aluno'
                autoCapitalize='words'
              />
            )}
          />

          <Controller
            name='dateOfBirth'
            control={controller.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Informe a data de nascimento'
                value={value}
                onChangeText={(value) => {
                  const maskedValue = MaskUtils.applyBirthDateMask(value);
                  onChange(maskedValue);
                }}
                errorMessage={controller.errors.dateOfBirth?.message}
                label='Data de nascimento'
                maxLength={10}
                keyboardType='number-pad'
              />
            )}
          />

          <Button
            title='Cadastrar'
            onPress={controller.handleRegisterPress}
            containerStyle={{ width: '100%', marginTop: theme.spacing.lg }}
            loading={controller.isSubmitting}
            disabled={!controller.isValid}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateStudentModal;
