import React, { useState } from 'react';
import { render, Box } from 'ink';
import { TodosUi } from './src/components/todos';
import { Todos } from './src/objects/todos';
import { Todo } from './src/data/todo';
import { Input } from './src/components/input';
import type { TodoProps } from './src/components/todo';
import { WIDTH } from './src/utils';
import { Maybe } from './src/components/maybe';
import { todoFocus } from './src/objects/todo-focus';

const todos = new Todos();

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Array<Todo>>([...todos]);

  const handleSubmit = (content: string) => {
    todos.add(Todo.fromContent(content));
    setTodoItems([...todos]);
  };

  const handleDelete: TodoProps['onDelete'] = (id) => {
    todos.delete(id);
    setTodoItems([...todos]);
    todoFocus.delete(id);
  };

  const handleUpdate: TodoProps['onDelete'] = (id) => {
    todos.update(id);
    setTodoItems([...todos]);
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
