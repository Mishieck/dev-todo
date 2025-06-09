import React, { useEffect } from 'react';
import { Box, Spacer, Text, useFocus } from "ink";
import { Todo } from "./data"
import { todoFocus } from '@/objects/todo-focus';
import { WithBadge, type Badge } from './components/with-badge';
import { Either } from '@/components/either';
import { Maybe } from '@/components/maybe';

export type TodoProps = {
  todo: Todo;
};

const badges: Record<string, Badge> = {
  dateCreated: {
    icon: '+',
    colors: {
      background: 'white',
      foreground: 'black'
    }
  },
  dateCompleted: {
    icon: '✓',
    colors: {
      background: 'green',
      foreground: 'white'
    }
  },
  pending: {
    icon: '',
    colors: {
      background: 'white',
      foreground: 'black'
    }
  }
} as const;

export const TodoUi: React.FC<TodoProps> = props => {
  const { todo } = props as TodoProps; // TODO: Remove the type cast

  const {
    id,
    content,
    dateCreated,
    dateCompleted,
    isCompleted,
    category,
    action
  } = todo;

  const { isFocused } = useFocus({ id });

  useEffect(
    () => {
      if (isFocused) todoFocus.add(id);
      else todoFocus.delete(id);
    },
    [isFocused]
  );

  return (
    <Box flexDirection="column" paddingX={1} gap={1}>
      <Maybe display={!!action}>
        <Box>
          <Text bold>{category}</Text>
          <Spacer />
          <Text backgroundColor={'blue'} color={'white'}>
            {' '}{action}{' '}
          </Text>
        </Box>
      </Maybe>
      <Box>
        <Either displayFirst={isCompleted}>
          <WithBadge {...badges.dateCompleted}>
            {dateCompleted.toLocaleString()}
          </WithBadge>
          <WithBadge {...badges.pending}>Pending</WithBadge>
        </Either>
        <Spacer />
        <WithBadge {...badges.dateCreated}>
          {dateCreated.toLocaleString()}
        </WithBadge>
      </Box>
      <Text underline={isFocused}>{content}</Text>
    </Box>
  );
};

