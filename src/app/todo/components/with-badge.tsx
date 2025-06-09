import type { BackgroundColor, ForegroundColor } from "@/utils";
import { Text } from "ink";
import type React from "react";

export type Badge = {
  icon: string;
  colors: BadgeColors;
};

export type BadgeColors = {
  background: BackgroundColor;
  foreground: ForegroundColor;
};

export type WithBadgeProps = {
  icon: string;
  colors: BadgeColors;
  children: string;
};

export const WithBadge: React.FC<WithBadgeProps> = props => {
  const { icon, children, colors } = props;
  const { background, foreground } = colors;

  return (
    <Text>
      <Text color={background} inverse>
        {' '}{icon}{' '}
      </Text>
      {' '}
      <Text italic>{children}</Text>
    </Text>
  );
};
