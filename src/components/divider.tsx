import { Text } from 'ink';
import { type React } from 'react';

export type DividerProps = {
  width: number
};

export const Divider: React.FC<DividerProps> = ({ width }) => {
  return (
    <Text color='gray'>{'─'.repeat(width)}</Text>
  );
};
