import { type React, useState, useEffect } from 'react';
import { Box } from "ink";
import type { Todo } from "../data/todo";
import { TodoUi, type TodoProps } from "./todo";
import { Divider } from "./divider";
import { WIDTH } from '../utils';
import { todoFocus } from '../objects/todo-focus';
import { Maybe } from './maybe';
import { todos, type TodosEventObserver } from '../objects/todos';

export type TodosProps = {};

export const TodosUi: React.FC<TodosProps> = () => {
  const [todoItems, setTodoItems] = useState<Array<Todo>>([...todos]);
  const [isFocused, setIsFocused] = useState(todoFocus.isFocused);

  const updateTodoItems: TodosEventObserver = () => setTodoItems([...todos]);

  const handleDelete: TodoProps['onDelete'] = (id) => {
    todos.delete(id);
    setTodoItems([...todos]);
    todoFocus.delete(id);
  };

  const handleUpdate: TodoProps['onDelete'] = (id) => {
    todos.update(id);
    setTodoItems([...todos]);
  };

  const renderTodo = (todo: Todo, index: number) => {
    const todoUi = (
      <TodoUi
        key={todo.id}
        todo={todo}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    );

    // Remove the start and end borders
    const divider = <Divider key={index} width={WIDTH - 2} />;

    return index ? [divider, todoUi] : [todoUi]
  };

  useEffect(
    () => {
      todos.addObserver('add', updateTodoItems);
      todos.addObserver('delete', updateTodoItems);
      todos.addObserver('update', updateTodoItems);

      todoFocus.addObserver('update', ({ payload }) => setIsFocused(payload));
    },
    []
  );

  return (
    <Maybe display={!todos.isEmpty}>
      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor={isFocused ? undefined : 'gray'}
      >
        {todoItems.map(renderTodo).flat()}
      </Box>
    </Maybe>
  );
};
