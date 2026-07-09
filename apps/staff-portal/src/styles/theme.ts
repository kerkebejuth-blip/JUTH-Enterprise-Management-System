import { colors, semanticColors } from './colors'
import { radius, componentRadius } from './radius'
import { layoutSpacing, spacing } from './spacing'
import { typography } from './typography'

export type ThemeMode = 'light' | 'dark'

export const theme = {
  colors,
  typography,
  spacing,
  layoutSpacing,
  radius,
  componentRadius,
  modes: {
    light: {
      ...semanticColors.light,
      primary: colors.primary[700],
      primaryHover: colors.primary[800],
      secondary: colors.secondary[700],
      success: colors.success[700],
      warning: colors.warning[600],
      danger: colors.danger[600],
    },
    dark: {
      ...semanticColors.dark,
      primary: colors.primary[400],
      primaryHover: colors.primary[300],
      secondary: colors.secondary[400],
      success: colors.success[400],
      warning: colors.warning[400],
      danger: colors.danger[400],
    },
  },
} as const

export type HosTheme = typeof theme

export function getThemeMode(mode: ThemeMode) {
  return theme.modes[mode]
}
