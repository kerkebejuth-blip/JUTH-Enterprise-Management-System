export type ThemeMode = "light" | "dark" | "system";

export interface ThemeDefinition {
  colors: {
    background: string;
    surface: string;

    primary: string;
    secondary: string;

    text: string;
    textSecondary: string;

    border: string;

    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}