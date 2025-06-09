import type { BadgeColors } from "./components/with-badge";

export const defaultActionColors: BadgeColors = {
  background: 'blue',
  foreground: 'white'
};

export const actionColors: Record<string, BadgeColors> = {
  feat: { background: 'blue', foreground: 'white' },
  fix: { background: 'red', foreground: 'white' },
};

export const getActionColors = (action: string): BadgeColors => {
  return actionColors[action] ?? defaultActionColors;
};
