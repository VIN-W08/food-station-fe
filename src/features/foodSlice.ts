import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFood, IFoodCategory } from "../interfaces/IFood"
import { FoodRepository } from "../repositories/FoodRepository"

type InitialState = {
    foodCategoryList: IFoodCategory[],
    selectedFoodCategoryIds: string[],
    foodList: IFood[],
    selectedFoodId: string | null,
    selectedFood: IFood | null,
    foodSearchValue: string
}

const initialState: InitialState = {
    foodCategoryList: [],
    selectedFoodCategoryIds: [],
    foodList: [],
    selectedFoodId: null,
    selectedFood: null,
    foodSearchValue: ''
}

export const getFoodCategoryList = createAsyncThunk(
    'food/category/list',
    async (arg, thunkAPI) => {
        const data = await FoodRepository.getFoodCategoryList()
        return data
    }
)

export const getFoodList = createAsyncThunk(
    'food/list',
    async (arg, thunkAPI) => {
        const { selectedFoodCategoryIds, foodSearchValue } = (thunkAPI.getState() as any).food
        const query = { categories: selectedFoodCategoryIds, name: foodSearchValue }
        const data = await FoodRepository.getFoodList(query)
        return data
    }
)

export const getFoodById = createAsyncThunk(
    'food/:id',
    async (foodId: string, thunkAPI) => {
        const data = await FoodRepository.getFoodById(foodId)
        return data
    }
)

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setSelectedFoodCategoryId: (state, action: PayloadAction<{ type: 'add' | 'remove', value: string }>) => {
            const { type, value } = action.payload
            if (type === 'add') {
                state.selectedFoodCategoryIds.push(value)
            } else {
                const selectedId = state.selectedFoodCategoryIds.indexOf(value)
                if (selectedId !== -1) state.selectedFoodCategoryIds.splice(selectedId, 1)
            }
        },
        setSelectedFoodId: (state, action: PayloadAction<string>) => {
            state.selectedFoodId = action.payload
        },
        setFoodSearchValue: (state, action: PayloadAction<string>) => {
            state.foodSearchValue = action.payload
        },
        initSelectedFood: (state, action: PayloadAction<IFood | null>) => {
            state.selectedFood = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getFoodCategoryList.fulfilled, (state, action) => {
            if (action.payload) state.foodCategoryList = action.payload
        })
        builder.addCase(getFoodList.fulfilled, (state, action) => {
            if (action.payload) state.foodList = action.payload
        })
        builder.addCase(getFoodById.fulfilled, (state, action) => {
            if (action.payload) state.selectedFood = action.payload
        })
    }
})

export const foodActions = foodSlice.actions
export default foodSlice.reducer