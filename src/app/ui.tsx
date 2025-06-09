import React, { useEffect } from 'react';
import { Box } from 'ink';
import { TodosUi } from './todos/ui';
import { Input } from './input/ui';
import { WIDTH } from '@/utils';
import { FileSystem } from '@/objects/file-system';
import { todos } from './todos/object';
import { Todo, TodoData } from './todo/data';

const defaultTodoListFile = new URL('./todos.json', import.meta.url).toString();
let envFilePath = ''

const envVarNames = [
  FileSystem.todoListFilePathEnvVar,
  FileSystem.todoListFilePathEnvVarV010
];

for (const name of envVarNames) {
  if (process.env[name]) envFilePath = process.env[name];
}

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
            const fs = new FileSystem(todos);

            if (todosData instanceof Array) {
              const [first] = todosData;

              // Migrate from v0.1.x to v0.2.x
              const newData = 'action' in first
                ? todosData as Array<TodoData>
                : todosData.map(data => Todo.fromDataV010(data));

              todos.initialize(newData);
              if (newData !== todosData) fs.write();
            }
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
