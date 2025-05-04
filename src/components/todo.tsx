import { type React, useEffect } from 'react';
import { Box, Spacer, Text, useFocus } from "ink";
import { Todo } from "../data/todo"
import { todoFocus } from '../objects/todo-focus';

export type TodoProps = {
  todo: Todo;
};

export const TodoUi: React.FC<TodoProps> = props => {
  const { todo } = props as TodoProps; // TODO: Remove the type cast
  const { id, content, dateCreated, dateCompleted, isCompleted } = todo;
  const status = isCompleted ? '✓' : 'o';

  const { isFocused } = useFocus();
  useEffect(
    () => {
      if (isFocused) todoFocus.add(id);
      else todoFocus.delete(id);
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

