import { type React, useState, useEffect } from 'react';
import { Box, useInput, useFocusManager } from "ink";
import type { Todo } from "../data/todo";
import { TodoUi } from "./todo";
import { Divider } from "./divider";
import { WIDTH } from '../utils';
import { todoFocus } from '../objects/todo-focus';
import { Maybe } from './maybe';
import { todos } from '../objects/todos';

export type TodosProps = {};

export const TodosUi: React.FC<TodosProps> = () => {
  const [todoItems, setTodoItems] = useState<Array<Todo>>([...todos]);
  const [isFocused, setIsFocused] = useState(todoFocus.isFocused);
  const { focusNext, focusPrevious } = useFocusManager();

  const updateTodoItems = () => setTodoItems([...todos]);

  const handleDelete = () => {
    const id = todoFocus.values().next().value;
    if (!id) return;
    todos.delete(id);
    setTodoItems([...todos]);
    todoFocus.delete(id);
  };

  const handleUpdate = () => {
    const id = todoFocus.values().next().value;
    if (!id) return;
    todos.update(id);
    setTodoItems([...todos]);
  };

  useInput((text) => {
    if (!isFocused) return;

    switch (text) {
      case 'j': {
        focusNext();
        focusNext(); // TODO: Find out why this extra call is necessary
        break;
      }
      case 'k': {
        focusPrevious();
        break;
      }
      case 'u': {
        handleUpdate();
        break;
      }
      case 'd': {
        handleDelete();
        break;
      }
    }
  });

  const renderTodo = (todo: Todo, index: number) => {
    const todoUi = <TodoUi key={todo.id} todo={todo} />;

    // Remove the start and end borders
    const divider = <Divider key={index} width={WIDTH - 2} />;

    return index ? [divider, todoUi] : [todoUi]
  };

  useEffect(
    () => {
      todos.addObserver('initialize', () => updateTodoItems());
      todos.addObserver('add', () => updateTodoItems());
      todos.addObserver('delete', () => updateTodoItems());
      todos.addObserver('update', () => updateTodoItems());

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
