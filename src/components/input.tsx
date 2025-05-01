import { useState, type React } from 'react';
import TextInput, { type Props } from 'ink-text-input';
import { Box, useInput, useFocusManager, useFocus } from 'ink';

export type InputProps = {
  onSubmit: Props['onSubmit'];
};

export const Input: React.FC<InputProps> = props => {
  const [text, setText] = useState('');
  const { onSubmit } = props;

  const { isFocused } = useFocus({ autoFocus: true });
  const { focusNext } = useFocusManager();

  const handleInput = (text: string) => {
    if (!isFocused) return;
    setText(text);
  };

  useInput((text, key) => {
    if (!isFocused && text === 'j') {
      focusNext();
      focusNext();
    }
  });

  const handleSubmit = (value: string) => {
    onSubmit(value);
    setText('');
  };

  return (
    <Box borderStyle="round">
      <TextInput
        value={text}
        placeholder="Enter todo"
        onChange={handleInput}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
