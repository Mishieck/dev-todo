import React, { useEffect } from 'react';
import { Box } from 'ink';
import { TodosUi } from './todos/ui';
import { Input } from './input/ui';
import { WIDTH } from '@/utils';
import { fileSystem } from '@/objects/file-system';
import { todos } from './todos/object';

export const App: React.FC = () => {
  useEffect(
    () => {
      fileSystem
        .read()
        .then(
          todosData => {
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
