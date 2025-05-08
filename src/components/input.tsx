import React, { useState } from 'react';
import TextInput from 'ink-text-input';
import { Box, useInput, useFocusManager, useFocus } from 'ink';
import { todos } from '../objects/todos';
import { Todo } from '../data/todo';
import { useFocusNext } from '../hooks/focus-next';

export type InputProps = {};

export const INPUT_ID = 'input';

export const Input: React.FC<InputProps> = () => {
  const [text, setText] = useState('');
  const { isFocused } = useFocus({ autoFocus: true, id: INPUT_ID });
  const focusNext = useFocusNext();

  const handleInput = (text: string) => {
    if (!isFocused) return;
    setText(text);
  };

  useInput((text, key) => {
    if (isFocused) {
      if (key.tab || key.downArrow) focusNext(key.shift ? -1 : 1);
      else if (key.upArrow) focusNext(-1);
    } else {
      if (text === 'j') focusNext(1);
      else if (text === 'k') focusNext(-1);
    }
  });

  const handleSubmit = (value: string) => {
    todos.add(Todo.fromContent(value));
    setText('');
  };

  return (
    <Box
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
