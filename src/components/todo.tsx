import { type React, useEffect } from 'react';
import { Box, Spacer, Text, useFocus, useFocusManager, useInput } from "ink";
import { Todo } from "../data/todo"
import { useTodoItemFocused } from '../hooks/todo-item-focused';

export type TodoProps = {
  todo: Todo;
  onUpdate: (todoId: string) => void;
  onDelete: (todoId: string) => void;
};

export const TodoUi: React.FC<TodoProps> = props => {
  const { todo, onDelete, onUpdate } = props as TodoProps; // TODO: Remove the type cast
  const { id, content, dateCreated, dateCompleted, isCompleted } = todo;
  const status = isCompleted ? '✓' : 'o';

  const { isFocused } = useFocus();
  const { focusNext, focusPrevious, disableFocus } = useFocusManager();
  const { focusedItems } = useTodoItemFocused();

  useInput((text) => {
    if (!isFocused) return;

    switch (text) {
      case 'j': {
        focusNext();
        break
      }
      case 'k': {
        focusPrevious();
        break
      }
      case 'u': {
        onUpdate(id);
        break
      }
      case 'd': {
        onDelete(id);
        break
      }
    }
  });

  useEffect(
    () => {
      if (isFocused) focusedItems.add(id);
      else focusedItems.delete(id);
    },
    [isFocused]
  );

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box>
        <Text color='gray'>{dateCreated.toLocaleString()}</Text>
        <Spacer />
        <Text color='gray'>
          {
            dateCompleted === Todo.defaultDate
              ? 'Present'
              : dateCompleted.toLocaleString()
          }
        </Text>
      </Box>
      <Box>
        <Text color={isCompleted ? 'green' : 'gray'}>{status} </Text>
        <Text underline={isFocused}>{content}</Text>
      </Box>
    </Box>
  );
};

