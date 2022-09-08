import React, { FC } from 'react'
import * as ROUTES from './constant'
import Dashboard from '../pages/Dashboard/index'
import Login from '../pages/Login/index'
import { useRecoilState } from 'recoil'
import * as recoilState from '../recoilState'
import { Navigate } from 'react-router-dom'

const RouterGuard = (props: any) => {
  const [profileData] = useRecoilState(recoilState.profileData)
  const logined = localStorage.getItem('username')
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
