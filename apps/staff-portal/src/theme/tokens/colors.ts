import type { ThemeDefinition } from "../types/theme";

export const lightTheme: ThemeDefinition = {
  colors: {
    background: "#F4F7FB",
    surface: "#FFFFFF",

    primary: "#1565D8",
    secondary: "#64748B",

    text: "#0F172A",
    textSecondary: "#475569",

    border: "#E5E7EB",

    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#0891B2",
  },
};

export const darkTheme: ThemeDefinition = {
  colors: {
    background: "#0F172A",
    surface: "#1E293B",

    primary: "#60A5FA",
    secondary: "#94A3B8",

    text: "#F8FAFC",
    textSecondary: "#CBD5E1",

    border: "#334155",

    success: "#22C55E",
    warning: "#FBBF24",
    danger: "#EF4444",
    info: "#38BDF8",
  },
};