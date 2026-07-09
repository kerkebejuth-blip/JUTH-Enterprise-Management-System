import { ChevronRight, Home } from 'lucide-react'
import { Link, useMatches } from 'react-router-dom'

type BreadcrumbHandle = {
  crumb?: string
}

type Breadcrumb = {
  label: string
  pathname: string
}

export function Breadcrumbs() {
  const matches = useMatches()
  const crumbs = matches
    .map((match) => {
      const handle = match.handle as BreadcrumbHandle | undefined

      return handle?.crumb
        ? {
            label: handle.crumb,
            pathname: match.pathname,
          }
        : null
    })
    .filter((crumb): crumb is Breadcrumb => Boolean(crumb))

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <li
              key={`${crumb.pathname}-${crumb.label}`}
              className="flex min-w-0 items-center gap-1"
            >
              {index > 0 ? (
                <ChevronRight className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
              ) : null}
              {index === 0 ? (
                <Home className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
              ) : null}
              {isLast ? (
                <span className="truncate font-semibold text-slate-900">{crumb.label}</span>
              ) : (
                <Link to={crumb.pathname} className="truncate text-slate-500 hover:text-slate-900">
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
