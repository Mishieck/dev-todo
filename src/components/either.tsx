import React from "react"

export type EitherProps = {
  displayFirst: boolean;
  children: [React.ReactElement, React.ReactElement];
};

export const Either: React.FC<EitherProps> = props => {
  const { displayFirst, children } = props;
  const [first, second] = React.Children.toArray(children);
  return displayFirst ? first : second;
};
