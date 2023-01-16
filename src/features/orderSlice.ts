import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFood } from "../interfaces/IFood"
import { IOrder, IAddOrderBody, IOrderFood, IRecipient, OrderStatus } from "../interfaces/IOrder"
import { OrderRepository } from "../repositories/OrderRepository"
import { uiActions } from "./uiSlice"

type InitialState = {
    cart: IOrderFood[]
    order: IOrder,
    recipientProfileInput: IRecipient,
    selectedFoodNote: string,
    orderList: IOrder[]
    selectedOrder: IOrder | null
}

type ValidationResponse = {
    valid: boolean,
    message: string
}

export const orderStatusCodeToTextMap = new Map<number, OrderStatus>([
    [0, 'in-queue'],
    [1, 'in-kitchen'],
    [2, 'on-delivery'],
    [3, 'completed']
])

const initialState: InitialState = {
    cart: [],
    order: {
        _id: '',
        userId: '',
        foods: [],
        recipient: {
            recipientName: '',
            contactNumber: '',
            address: ''
        },
        totalPayable: 0,
        status: null,
        created_at: null,
        updated_at: null
    },
    recipientProfileInput: {
        recipientName: '',
        contactNumber: '',
        address: ''
    },
    selectedFoodNote: '',
    orderList: [],
    selectedOrder: null
}

export const checkFoodInArray = (targetFood: IOrderFood, objArr: IOrderFood[]): {
    exist: boolean,
    count: number
    indexes: number[]
} => {
    let existCount = 0
    let existIndexes: number[] = []
    const existBoolArr = objArr.map(obj => targetFood._id === obj._id && targetFood.note === obj.note)
    for (var idx in existBoolArr) {
        if (existBoolArr[idx]) {
            existCount++
            existIndexes.push(+idx)
        }
    }
    return {
        exist: existBoolArr.includes(true),
        count: existCount,
        indexes: existIndexes
    }
}

const concludeOrderFoods = (foods: IOrderFood[]): IOrderFood[] => {
    foods.forEach(food => {
        const { exist, count, indexes } = checkFoodInArray(food, foods)
        console.log(count)
        if (exist && count > 1) {
            food.qty += count - 1
            for (var n = 1; n < count; n++) {
                foods.splice(indexes[n - (n - 1)], 1)
            }
            console.log(count)
            food.subtotal = food.price * count
        }
        return food
    })
    return foods
}

const convertFoodToOrderFood = (food: IFood, note: string): IOrderFood => {
    return {
        _id: food._id,
        name: food.name,
        description: food.description,
        image: food.image,
        price: food.price,
        subtotal: food.price,
        qty: 1,
        note: note ?? ''
    }
}

const validateRecipientProfile = (recipientProfile: IRecipient): ValidationResponse => {
    const response = { valid: false, message: '' }
    if (recipientProfile.address.trim() === '') {
        response.message = 'Delivery Address is a required field'
        return response
    }
    if (recipientProfile.recipientName.trim() === '') {
        response.message = 'Recipient Name is a required field'
        return response
    }
    if (recipientProfile.contactNumber.trim() === '') {
        response.message = 'Contact Number is a required field'
        return response
    }
    response.valid = true
    return response
}

export const addOrder = createAsyncThunk(
    'order/add',
    async (arg, thunkAPI) => {
        const { order } = (thunkAPI.getState() as any).order
        const { valid, message } = validateRecipientProfile(order.recipient)
        if (valid) {
            const body = {
                user: order.userId,
                foods: order.foods.map((food: IOrderFood) => ({
                    _id: food._id,
                    note: food.note,
                    qty: food.qty,
                    subtotal: food.subtotal
                })),
                recipient: order.recipient,
                totalPayable: order.totalPayable
            } as IAddOrderBody
            const data = await OrderRepository.addOrder(body)
            return data
        }
        thunkAPI.dispatch(uiActions.showToast(message))
        return thunkAPI.rejectWithValue(message)
    }
)

export const getOrderList = createAsyncThunk(
    'order/list',
    async (arg, thunkAPI) => {
        const { user } = (thunkAPI.getState() as any).user
        const data = await OrderRepository.getOrderList(user._id)
        return data
    }
)

export const getOrderById = createAsyncThunk(
    'order/:id',
    async (orderId: string, thunkAPI) => {
        const data = await OrderRepository.getOrderById(orderId)
        return data
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        initOrder: (state, action: PayloadAction<{ userId: string, foods: IFood[] }>) => {
            const { userId, foods } = action.payload
            state.order.userId = userId
            state.order.foods = concludeOrderFoods(foods.map(food => convertFoodToOrderFood(food, state.selectedFoodNote)))
            state.order.totalPayable = state.order.foods.reduce((sum, current) => sum + current.subtotal, 0)
        },
        initOrderFromCart: (state, action: PayloadAction<string>) => {
            state.order.userId = action.payload
            state.order.foods = state.cart
            state.order.totalPayable = state.order.foods.reduce((sum, current) => sum + current.subtotal, 0)
        },
        setRecipientProfileInput: (state, action: PayloadAction<{ key: keyof IRecipient, value: string }>) => {
            state.recipientProfileInput[action.payload.key] = action.payload.value
        },
        setRecipientProfile: (state) => {
            const { valid, message } = validateRecipientProfile(state.recipientProfileInput)
            if (valid) state.order.recipient = state.recipientProfileInput
        },
        initRecipientProfileInput: (state) => {
            state.recipientProfileInput = {
                recipientName: '',
                contactNumber: '',
                address: ''
            }
        },
        initSelectedFoodNoteInput: (state) => {
            state.selectedFoodNote = ''
        },
        increaseItemCount: (state, action: PayloadAction<string>) => {
            const selectedItem = state.cart.find(item => item._id === action.payload)
            if (selectedItem) {
                selectedItem.qty++
                selectedItem.subtotal += selectedItem.price
            }
        },
        decreaseItemCount: (state, action: PayloadAction<string>) => {
            const selectedItem = state.cart.find(item => item._id === action.payload)
            if (selectedItem) {
                selectedItem.qty--
                selectedItem.subtotal -= selectedItem.price
                if (selectedItem.qty === 0) {
                    const itemIdx = state.cart.findIndex(item => item._id === action.payload)
                    state.cart.splice(itemIdx, 1)
                }
            }
        },
        addCartItem: (state, action: PayloadAction<IFood[]>) => {
            state.cart = concludeOrderFoods([
                ...state.cart,
                ...action.payload.map(food => convertFoodToOrderFood(food, state.selectedFoodNote))
            ])
        },
        removeCartItem: (state, action: PayloadAction<IOrderFood>) => {
            const { indexes } = checkFoodInArray(action.payload, state.cart)
            state.cart.splice(indexes[0], 1)
        },
        setSelectedFoodNote: (state, action: PayloadAction<string>) => {
            state.selectedFoodNote = action.payload
        },
        initSelectedOrder: (state) => {
            state.selectedOrder = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getOrderList.fulfilled, (state, action) => {
            state.orderList = action.payload
        })
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.selectedOrder = action.payload
        })
    }
})

export const orderActions = orderSlice.actions
export default orderSlice.reducer