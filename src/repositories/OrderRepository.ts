import { IOrder, IAddOrderBody } from "../interfaces/IOrder"
import { NetworkService } from "../services/NetworkService"

export class OrderRepository {
    static getOrderList = async (userId: string): Promise<IOrder[]> => {
        const response = await NetworkService.req('get', `/order/list/${userId}`)
        return response
    }

    static getOrderById = async (id: string): Promise<IOrder> => {
        const response = await NetworkService.req('get', `order/${id}`)
        return response
    }

    static addOrder = async (body: IAddOrderBody): Promise<IOrder> => {
        const response = await NetworkService.req('post', 'order', body)
        return response
    }
}