import { type React, useState, useEffect } from 'react';
import { Box } from "ink";
import type { Todo } from "../data/todo";
import { TodoUi, type TodoProps } from "./todo";
import { Divider } from "./divider";
import { WIDTH } from '../utils';
import { useTodoItemFocused } from '../hooks/todo-item-focused';

export type TodosProps = {
  todos: Array<Todo>;
  onUpdate: TodoProps['onUpdate'];
  onDelete: TodoProps['onDelete'];
};

export const TodosUi: React.FC<TodosProps> = props => {
  const { todos, onDelete, onUpdate } = props as TodosProps; // TODO: Remove type cast

  const { isFocused: initialIsFocused, focusedItems } = useTodoItemFocused();
  const [isFocused, setIsFocused] = useState(initialIsFocused);

  const renderTodo = (todo: Todo, index: number) => {
    const todoUi = (
      <TodoUi
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    // Remove the start and end borders
    const divider = <Divider key={index} width={WIDTH - 2} />;

    return index ? [divider, todoUi] : [todoUi]
  };

  useEffect(
    () => {
      focusedItems.$addObserver('todos-ui', setIsFocused);
    },
    []
  );

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={isFocused ? undefined : 'gray'}
    >
      {todos.map(renderTodo).flat()}
    </Box>
  );
};
