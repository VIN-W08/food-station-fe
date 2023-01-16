import { IFood, IFoodCategory, IGetFoodListQuery } from "../interfaces/IFood"
import { NetworkService } from "../services/NetworkService"

export class FoodRepository {
    static getFoodCategoryList = async (): Promise<IFoodCategory[]> => {
        const response = await NetworkService.req('get', '/food/category/list')
        return response
    }

    static getFoodList = async (query: IGetFoodListQuery): Promise<IFood[]> => {
        const response = await NetworkService.req('get', '/food/list', query)
        return response
    }

    static getFoodById = async (id: string): Promise<IFood> => {
        const response = await NetworkService.req('get', `food/${id}`)
        return response
    }
}