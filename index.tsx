#!/bin/env bun

import React, { useEffect } from 'react';
import { render, Box } from 'ink';
import { TodosUi } from './src/components/todos';
import { Input } from './src/components/input';
import { WIDTH } from './src/utils';
import { FileSystem } from './src/objects/file-system';
import { todos } from './src/objects/todos';

const defaultTodoListFile = new URL('./todos.json', import.meta.url).toString();
const envFilePath = process.env[FileSystem.todoListFilePathEnvVar];

if (envFilePath) {
  // TODO: Check to see if this works on Windows
  if (/[/\\]/.test(envFilePath))
    process.env[FileSystem.todoListFilePathEnvVar] = `file://${envFilePath}`;
} else {
  process.env[FileSystem.todoListFilePathEnvVar] = defaultTodoListFile;
}


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
    <Box justifyContent="center">
      <Box flexDirection="column" width={WIDTH}>
        <Input />
        <TodosUi />
      </Box>
    </Box>
  );
};

render(<App />);
