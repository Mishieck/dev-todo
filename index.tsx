import { type React } from 'react';
import { render, Box } from 'ink';
import { TodosUi } from './src/components/todos';
import { Input } from './src/components/input';
import { WIDTH } from './src/utils';

const App: React.FC = () => {
  return (
    <Box flexDirection="column" width={WIDTH}>
      <Input />
      <TodosUi />
    </Box>
  );
};

render(<App />);
