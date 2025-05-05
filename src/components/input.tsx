import { useState, type React } from 'react';
import TextInput from 'ink-text-input';
import { Box, useInput, useFocusManager, useFocus } from 'ink';
import { todos } from '../objects/todos';
import { Todo } from '../data/todo';

export type InputProps = {};

export const INPUT_ID = 'input';

export const Input: React.FC<InputProps> = () => {
  const [text, setText] = useState('');

  const { isFocused } = useFocus({ autoFocus: true });
  const { focusNext } = useFocusManager();

  const handleInput = (text: string) => {
    if (!isFocused) return;
    setText(text);
  };

  useInput((text, _key) => {
    if (text === 'j' && !isFocused) {
      focusNext();
      focusNext();
    }
  });

  const handleSubmit = (value: string) => {
    todos.add(Todo.fromContent(value));
    setText('');
  };

  return (
    <Box
      id={INPUT_ID}
      borderStyle="round"
      borderColor={isFocused ? undefined : 'gray'}
      paddingX={1}
    >
      <TextInput
        value={text}
        placeholder="Enter todo"
        onChange={handleInput}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
