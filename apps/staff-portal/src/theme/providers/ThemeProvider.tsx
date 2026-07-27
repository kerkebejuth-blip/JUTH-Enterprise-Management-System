import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ThemeMode } from "../types/theme";
import { lightTheme, darkTheme } from "../tokens/colors";

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "juth-hos-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? "system";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const activeTheme = mode === "system" ? getSystemTheme() : mode;

  const theme = activeTheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
  }, [activeTheme]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      theme,
    }),
    [mode, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider.");
  }

  return context;
}
