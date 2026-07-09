import { createBrowserRouter, Navigate } from 'react-router-dom'

import { ModulePage } from '../../features/module-pages/ModulePage'
import { MainLayout } from '../layouts/MainLayout'
import { navigationItems } from './navigation'

const moduleRoutes = navigationItems.map((item) => ({
  index: item.path === '/',
  path: item.path === '/' ? undefined : item.path.slice(1),
  element: <ModulePage module={item} />,
  handle: {
    crumb: item.label,
  },
}))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    handle: {
      crumb: 'HOS',
    },
    children: [
      ...moduleRoutes,
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
