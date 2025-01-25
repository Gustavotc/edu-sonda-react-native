import React from 'react';
import { Input, InputProps, useTheme } from '@rneui/themed';

type TextInputProps = InputProps;

const TextInput: React.FC<TextInputProps> = ({ ...rest }) => {
  const { theme } = useTheme();

  return (
    <Input
      {...rest}
      containerStyle={{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.greyOutline,
      }}
      inputContainerStyle={{}}
    />
  );
};

export default TextInput;
