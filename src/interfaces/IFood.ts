export interface IFood {
    _id: string
    name: string
    description: string | null
    image: string | null
    price: number
    foodCategory: {
        id: string,
        key: string,
        label: string
    }
}

export interface IFoodCategory {
    _id: string
    key: string
    label: string
}

export interface IGetFoodListQuery {
    categories: string[]
}