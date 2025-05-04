import { type React, useEffect } from 'react';
import { render, Box } from 'ink';
import { TodosUi } from './src/components/todos';
import { Input } from './src/components/input';
import { WIDTH } from './src/utils';
import { FileSystem } from './src/objects/file-system';
import { todos } from './src/objects/todos';

const defaultTodoListFile = new URL('./todos.json', import.meta.url).toString();

if (!process.env[FileSystem.todoListFilePathEnvVar])
  process.env[FileSystem.todoListFilePathEnvVar] = defaultTodoListFile;


const App: React.FC = () => {
  useEffect(
    () => {
      FileSystem
        .read()
        .then(
          todosData => {
            todos.initialize(todosData instanceof Array ? todosData : []);
            new FileSystem(todos);
          }
        );
    },
    []
  );

  return (
    <Box flexDirection="column" width={WIDTH}>
      <Input />
      <TodosUi />
    </Box>
  );
};

render(<App />);
