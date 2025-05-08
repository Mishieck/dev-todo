import React from 'react';

export type MaybeProps = {
  display?: boolean;
  children: React.ReactElement;
};

export const Maybe: React.FC<MaybeProps> = props => {
  const { children, display = false } = props;
  return display ? children : null;
};
