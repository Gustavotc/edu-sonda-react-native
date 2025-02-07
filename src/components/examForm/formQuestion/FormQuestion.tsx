import React from 'react';
import { ButtonGroup, Card, Text, useTheme } from '@rneui/themed';

type Props =
  | {
      question: string;
      questionType: 'boolean';
      readonly: boolean;
      value?: boolean;
      error?: string;
      onChange: (value: boolean) => void;
      alternatives?: undefined;
    }
  | {
      question: string;
      questionType: 'alternative';
      readonly: boolean;
      value?: string;
      error?: string;
      onChange: (value: string) => void;
      alternatives?: string[];
    };

type BooleanAlternativesProps = {
  readonly: boolean;
  value?: boolean;
  onChange: (value: boolean) => void;
};

type AlternativesProps = {
  readonly: boolean;
  value?: string;
  alternatives?: string[];
  onChange: (value: string) => void;
};

const BooleanAlternatives = ({
  value,
  onChange,
  readonly,
}: BooleanAlternativesProps) => {
  return (
    <ButtonGroup
      buttons={['Não', 'Sim']}
      selectedIndex={value !== undefined ? Number(value) : undefined}
      onPress={(selectedIndex) => {
        if (readonly) return;
        onChange(Boolean(selectedIndex));
      }}
    />
  );
};

const Alternatives = ({
  value,
  onChange,
  readonly,
  alternatives,
}: AlternativesProps) => {
  let buttons = ['Nenhuma', 'Algumas', 'Todas'];

  console.log(value);

  if (alternatives) {
    buttons = alternatives.map((value) => value);
  }

  const currentValue = value ? buttons.indexOf(value) : undefined;

  const containerStyle = alternatives
    ? { height: alternatives ? 80 : undefined }
    : undefined;

  return (
    <ButtonGroup
      buttons={buttons}
      selectedIndex={currentValue}
      onPress={(selectedIndex) => {
        if (readonly) return;

        if (alternatives) {
          onChange(buttons[selectedIndex]);
          return;
        }

        onChange(buttons[selectedIndex]);
      }}
      textStyle={{ textAlign: 'center' }}
      containerStyle={containerStyle}
    />
  );
};

const FormQuestion: React.FC<Props> = ({
  question,
  questionType,
  value,
  error,
  readonly,
  alternatives,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <Card
      containerStyle={{
        width: '100%',
        margin: 0,
        paddingHorizontal: theme.spacing.sm,
      }}>
      <Card.Title>{question}</Card.Title>

      <Card.Divider style={{ margin: 0 }} />

      {questionType === 'boolean' && (
        <BooleanAlternatives
          value={value}
          onChange={onChange}
          readonly={readonly}
        />
      )}

      {questionType === 'alternative' && (
        <Alternatives
          value={value}
          onChange={onChange}
          readonly={readonly}
          alternatives={alternatives}
        />
      )}

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </Card>
  );
};

export default FormQuestion;
