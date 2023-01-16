import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { AppRoute } from './AppRoute'
import { PrivateRoute } from './PrivateRoute'
import { routes } from './Routes'

const LoginPage = lazy(() => import('../components/auth/login/LoginPage'))
const RegisterPage = lazy(() => import('../components/auth/register/RegisterPage'))

export const AppRouter = () => {
    return (
        <Router>
            <NavBar />
            <Suspense fallback={<></>}>
                <Routes>
                    <Route path={routes.login} element={<LoginPage />} />
                    <Route path={routes.register} element={<RegisterPage />} />
                    <Route path='*' element={<PrivateRoute />}>
                        <Route path='*' element={<AppRoute />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router >
    )
}
