import type { TextProps } from "ink";

export const WIDTH = 60;

export type ForegroundColor = Exclude<TextProps['color'], undefined>
  | 'foreground';

export type BackgroundColor = Exclude<TextProps['backgroundColor'], undefined>
  | 'background';
