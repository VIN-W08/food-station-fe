export const routes = {
    login: '/login',
    register: '/register',
    productList: '/product/list',
    productDetail: (id: string) => `/product/${id}`,
    cart: 'cart',
    checkout: '/checkout',
    orderStatus: (status: string) => `/order/status/${status}`,
    orderList: '/order/list',
    orderDetail: (id: string) => `/order/${id}`
}