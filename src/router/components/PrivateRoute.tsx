import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appHooks'

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const loggedIn = useAppSelector((state) => state.main.loggedIn)
  if (!loggedIn) return <Redirect to="/auth" />
  return <Route {...props} />
}

export default PrivateRoute
