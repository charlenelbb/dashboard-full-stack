import * as ROUTES from './constant'
import Dashboard from '../pages/Dashboard/index'
import Login from '../pages/Login/index'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const RouterGuard = (props: any) => {
  const logined = useCookies()
  if (!logined) return <Navigate to={ROUTES.LOGIN} replace={true} />

  return props.children
}

const routes = [
  {
    path: ROUTES.DASHBOARD,
    element: (
      <RouterGuard>
        <Dashboard />
      </RouterGuard>
    ),
    caseSensitive: true,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Login />,
  },
]

export default routes
