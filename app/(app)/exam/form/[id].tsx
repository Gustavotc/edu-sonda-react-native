import React from 'react';
import { Button, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormQuestion from '@/src/components/examForm/formQuestion/FormQuestion';
import { ScrollView, View } from 'react-native';
import { useExameFormController } from '@/src/hooks/controllers/examForm/ExamFormController';
import { Controller } from 'react-hook-form';

const ExamForm: React.FC = () => {
  const { theme } = useTheme();

  const controller = useExameFormController();

  return (
    <SafeAreaView style={{ padding: 24 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          h4
          style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          Sondagem
        </Text>

        <View style={{ gap: theme.spacing.lg }}>
          <Controller
            control={controller.control}
            name='recognizesName'
            render={({ field: { value, onChange } }) => (
              <FormQuestion
                question='Escreve e reconhece o nome'
                questionType='boolean'
                onChange={onChange}
                value={value}
                error={controller.errors.recognizesName?.message}
                readonly={controller.disableForm}
              />
            )}
          />

          <Controller
            control={controller.control}
            name='recognizesAlphabet'
            render={({ field: { value, onChange } }) => (
              <FormQuestion
                question='Reconhece letras do alfabeto'
                questionType='alternative'
                onChange={onChange}
                value={value}
                error={controller.errors.recognizesAlphabet?.message}
                readonly={controller.disableForm}
              />
            )}
          />

          <Controller
            control={controller.control}
            name='recognizesNumbers'
            render={({ field: { value, onChange } }) => (
              <FormQuestion
                question='Reconhece números até 10'
                questionType='alternative'
                onChange={onChange}
                value={value}
                error={controller.errors.recognizesNumbers?.message}
                readonly={controller.disableForm}
              />
            )}
          />

          <Controller
            control={controller.control}
            name='recognizesColors'
            render={({ field: { value, onChange } }) => (
              <FormQuestion
                question='Reconhece as cores primárias'
                questionType='alternative'
                onChange={onChange}
                value={value}
                error={controller.errors.recognizesColors?.message}
                readonly={controller.disableForm}
              />
            )}
          />

          <Controller
            control={controller.control}
            name='recognizesForms'
            render={({ field: { value, onChange } }) => (
              <FormQuestion
                question='Reconhece as formas geométricas'
                questionType='alternative'
                onChange={onChange}
                value={value}
                error={controller.errors.recognizesForms?.message}
                readonly={controller.disableForm}
              />
            )}
          />

          <Controller
            control={controller.control}
            name='recognizesOwnBody'
            render={({ field: { value, onChange } }) => (
              <FormQuestion
                question='Desenha esquema corporal'
                questionType='boolean'
                onChange={onChange}
                value={value}
                error={controller.errors.recognizesOwnBody?.message}
                readonly={controller.disableForm}
              />
            )}
          />

          <Controller
            control={controller.control}
            name='classification'
            render={({ field: { value, onChange } }) => {
              const alternatives = [
                'pré silábico',
                'silábico sem valor',
                'silábico com valor',
                'silábico alfabético',
                'alfabético',
              ];
              return (
                <FormQuestion
                  question='Sondagem'
                  questionType='alternative'
                  onChange={onChange}
                  value={value}
                  error={controller.errors.classification?.message}
                  readonly={controller.disableForm}
                  alternatives={alternatives}
                />
              );
            }}
          />

          <Button
            title='Salvar'
            onPress={controller.handleSubmit}
            loading={controller.isSubmitting}
            disabled={controller.disableForm}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamForm;
