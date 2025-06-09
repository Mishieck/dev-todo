import React, { useState } from 'react';
import TextInput from 'ink-text-input';
import { Box, useInput, useFocus } from 'ink';
import { todos } from '@/app/todos/object';
import { Todo } from '@/app/todo/data';
import { useFocusNext } from '@/hooks/focus-next';

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
      borderDimColor={!isFocused}
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
