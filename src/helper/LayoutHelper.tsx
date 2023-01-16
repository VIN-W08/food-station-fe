import { routes } from "../router/Routes"

export type Menu = {
    key: string,
    label?: string,
    icon?: string,
    position: 'start' | 'end',
    route: string,
    auth: boolean
}

export const menuConfig: Menu[] = [
    {
        key: 'browse',
        label: 'Browse',
        position: 'start',
        route: routes.productList,
        auth: false
    },
    {
        key: 'orders',
        label: 'Orders',
        position: 'start',
        route: routes.orderList,
        auth: true
    },
    {
        key: 'cart',
        icon: 'shopping_cart',
        position: 'end',
        route: routes.cart,
        auth: true
    },
]