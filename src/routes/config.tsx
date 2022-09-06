import React from 'react'
import * as ROUTES from './constant'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'

const routes = [
	{
		path: ROUTES.DASHBOARD,
		element: <Dashboard />,
	},
	{
		path: ROUTES.LOGIN,
		element: <Login />,
	},
]

export default routes
