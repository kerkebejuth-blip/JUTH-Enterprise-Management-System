export const radius = {
  none: '0',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
} as const

export const componentRadius = {
  button: radius.lg,
  input: radius.lg,
  card: radius.lg,
  modal: radius.xl,
  badge: radius.md,
} as const
