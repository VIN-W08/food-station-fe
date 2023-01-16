import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './Routes'

const ProductListPage = lazy(() => import('../components/Product/ProductListPage'))
const ProductDetailPage = lazy(() => import('../components/Product/ProductDetailPage'))
const CheckoutPage = lazy(() => import('../components/Order/CheckoutPage'))
const CartPage = lazy(() => import('../components/Product/CartPage'))
const OrderStatusPage = lazy(() => import('../components/Order/OrderStatusPage'))
const OrderListPage = lazy(() => import('../components/Order/OrderListPage'))
const OrderDetailPage = lazy(() => import('../components/Order/OrderDetailPage'))

export const AppRoute = () => {
    return (
        <Routes>
            <Route path={routes.productList} element={<ProductListPage />} />
            <Route path={routes.productDetail(':id')} element={<ProductDetailPage />} />
            <Route path={routes.cart} element={<CartPage />} />
            <Route path={routes.checkout} element={<CheckoutPage />} />
            <Route path={routes.orderStatus(':status')} element={<OrderStatusPage />} />
            <Route path={routes.orderList} element={<OrderListPage />} />
            <Route path={routes.orderDetail(':id')} element={<OrderDetailPage />} />
            <Route path='/' element={<Navigate to={routes.productList} replace />} />
        </Routes>
    )
}