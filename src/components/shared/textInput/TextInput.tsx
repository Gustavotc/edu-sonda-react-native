import React from 'react';
import { Input, InputProps } from '@rneui/themed';

type TextInputProps = InputProps;

const TextInput: React.FC<TextInputProps> = ({ ...rest }) => {
  return <Input {...rest} />;
};

export default TextInput;
