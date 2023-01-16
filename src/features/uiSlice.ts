import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    isLoading: boolean,
    toast: {
        show: boolean,
        message: string
    }
}

const initialState: InitialState = {
    isLoading: false,
    toast: {
        show: false,
        message: ''
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        showToast: (state, action) => {
            state.toast = {
                show: true,
                message: action.payload
            }
        },
        hideToast: (state) => {
            state.toast = {
                show: false,
                message: ''
            }
        }
    }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer