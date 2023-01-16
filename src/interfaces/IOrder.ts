export type OrderStatus = 'completed' | 'in-kitchen' | 'in-queue' | 'on-delivery'

export interface IOrder {
    _id: string
    userId: string
    foods: IOrderFood[]
    recipient: IRecipient
    totalPayable: number
    status: number | null
    created_at: Date | null
    updated_at: Date | null
}

export interface IOrderFood {
    _id: string
    name: string
    description: string | null
    image: string | null
    price: number
    subtotal: number
    qty: number
    note: string
}

export interface IRecipient {
    recipientName: string,
    contactNumber: string,
    address: string
}

export interface IAddOrderBody {
    user: string | null
    foods: IOrderFoodBody[]
    recipient: IRecipient
    totalPayable: number
}

interface IOrderFoodBody {
    _id: string
    note: string
    qty: string
    subtotal: string
}

export type InitOrderStatus = 'successful' | 'failed'
