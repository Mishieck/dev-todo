import React, { useEffect } from 'react';
import { Box } from 'ink';
import { TodosUi } from './todos/ui';
import { Input } from './input/ui';
import { WIDTH } from '@/utils';
import { FileSystem } from '@/objects/file-system';
import { todos } from './todos/object';

const defaultTodoListFile = new URL('./todos.json', import.meta.url).toString();
const fileEnvVarName = FileSystem.todoListFilePathEnvVar;

const envFilePath = process.env[fileEnvVarName]
  ? process.env[fileEnvVarName]
  : '';

if (envFilePath) {
  // TODO: Check to see if this works on Windows
  if (/[/\\]/.test(envFilePath))
    process.env[FileSystem.todoListFilePathEnvVar] = `file://${envFilePath}`;
} else {
  process.env[FileSystem.todoListFilePathEnvVar] = defaultTodoListFile;
}

export const App: React.FC = () => {
  useEffect(
    () => {
      FileSystem
        .read()
        .then(
          todosData => {
            new FileSystem(todos);
            if (todosData instanceof Array) todos.initialize(todosData);
          }
        );
    },
    []
  );

  return (
    <Box justifyContent="center">
      <Box flexDirection="column" width={WIDTH}>
        <Input />
        <TodosUi />
      </Box>
    </Box>
  );
};
