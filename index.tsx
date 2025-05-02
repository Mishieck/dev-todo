import React, { useState } from 'react';
import { render, Box } from 'ink';
import { TodosUi } from './src/components/todos';
import { Todos } from './src/data/todos';
import { Todo } from './src/data/todo';
import { Input } from './src/components/input';
import type { TodoProps } from './src/components/todo';
import { WIDTH } from './src/utils';
import { Maybe } from './src/components/maybe';
import { useTodoItemFocused } from './src/hooks/todo-item-focused';

const todos = new Todos([]);

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Array<Todo>>([...todos.read()]);
  const { focusedItems } = useTodoItemFocused();

  const handleSubmit = (content: string) => {
    todos.add(Todo.fromContent(content));
    setTodoItems([...todos.read()]);
  };

  const handleDelete: TodoProps['onDelete'] = (id) => {
    todos.del(id);
    setTodoItems([...todos.read()]);
    focusedItems.delete(id);
  };

  const handleUpdate: TodoProps['onDelete'] = (id) => {
    todos.update(id);
    setTodoItems([...todos.read()]);
  };

  return (
    <Box flexDirection="column" width={WIDTH}>
      <Input onSubmit={handleSubmit} />
      <Maybe display={todoItems.length > 0}>
        <TodosUi
          todos={todoItems}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </Maybe>
    </Box>
  );
};

render(<App />);
