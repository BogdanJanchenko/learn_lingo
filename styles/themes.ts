export const themeNames = ['yellow', 'green', 'blue', 'pink', 'orange'] as const;

export type ThemeName = (typeof themeNames)[number];
