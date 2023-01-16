import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { routes } from './Routes'

export const PrivateRoute = () => {
    const userState = useAppSelector((state) => state.user)
    const isLoggedIn = userState.isLoggedIn
    return isLoggedIn ? <Outlet /> : <Navigate to={routes.login} />
}   