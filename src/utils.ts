import type { TextProps } from "ink";

export const WIDTH = 60;
export type ForegroundColor = Exclude<TextProps['color'], undefined>;
export type BackgroundColor = Exclude<TextProps['backgroundColor'], undefined>;
