import { type ButtonHTMLAttributes, type ComponentType, type SVGProps } from 'react'

import { cn } from '../utils/cn'

type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export function ButtonIcon({
  label,
  icon: Icon,
  className,
  type = 'button',
  ...props
}: ButtonIconProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm shadow-slate-950/5 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2',
        className,
      )}
      {...props}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}
