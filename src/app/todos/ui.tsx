import React, { useState, useEffect } from 'react';
import { Box, useInput } from "ink";
import type { Todo } from "@/app/todo/data";
import { TodoUi } from "@/app/todo/ui";
import { Divider } from "@/components/divider";
import { WIDTH } from '@/utils';
import { todoFocus } from '@/objects/todo-focus';
import { Maybe } from '@/components/maybe';
import { todos } from './object';
import { useFocusNext } from '@/hooks/focus-next';

export type TodosProps = {};

export const TodosUi: React.FC<TodosProps> = () => {
  const [todoItems, setTodoItems] = useState<Array<Todo>>([...todos.items]);
  const [isFocused, setIsFocused] = useState(todoFocus.isFocused);
  const focusNext = useFocusNext();

  const updateTodoItems = () => setTodoItems([...todos.items]);

  const handleDelete = () => {
    const id = todoFocus.values().next().value;
    if (!id) return;
    focusNext(1);
    todos.delete(id);
    todoFocus.delete(id);
    updateTodoItems();
  };

  const handleUpdate = () => {
    const id = todoFocus.values().next().value;
    if (!id) return;
    todos.update(id);
    updateTodoItems();
  };

  useInput((text, key) => {
    if (!isFocused) return;

    switch (text) {
      case 'j': {
        focusNext(1);
        break;
      }
      case 'k': {
        focusNext(-1);
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
      default:
        if (key.tab) focusNext(key.shift ? -1 : 1);
    }

    if (key.downArrow) focusNext(1);
    else if (key.upArrow) focusNext(-1);
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
        borderDimColor={!isFocused}
      >
        {todoItems.map(renderTodo).flat()}
      </Box>
    </Maybe>
  );
};
