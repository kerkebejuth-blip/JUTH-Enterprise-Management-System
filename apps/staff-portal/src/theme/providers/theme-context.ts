import { createContext } from "react";

import type { ThemeMode } from "../types/theme";
import { lightTheme } from "../tokens/colors";

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: typeof lightTheme;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
