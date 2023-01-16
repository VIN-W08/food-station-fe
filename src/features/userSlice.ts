import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAuthInfo, IUser, IUserInput } from "../interfaces/IUser"
import { UserRepository } from "../repositories/UserRepository"
import { LocalStorageService } from "../services/LocalStorageService"
import { uiActions } from "./uiSlice"

type InitialState = {
    user: IUser,
    isLoggedIn: boolean,
    userInput: IUserInput
}

type ValidationResponse = {
    valid: boolean,
    message: string
}

const initialState: InitialState = {
    user: {
        _id: '',
        name: '',
        email: '',
        password: ''
    },
    isLoggedIn: LocalStorageService.getAccessToken() !== '',
    userInput: {
        name: '',
        email: '',
        password: ''
    }
}

const validateUser = (user: IUser, validateName: boolean = true): ValidationResponse => {
    const response = { valid: false, message: '' }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (user.name.trim() === '' && validateName) {
        response.message = 'Name is a required field'
        return response
    }
    if (user.email.trim() === '') {
        response.message = 'Email is a required field'
        return response
    }
    if (!emailRegex.test(user.email)) {
        response.message = 'Email format is not valid'
        return response
    }
    if (user.password.trim() === '') {
        response.message = 'Password is a required field'
        return response
    }
    if (!passwordRegex.test(user.password)) {
        response.message = 'Password must contains at least 8 characters that includes an uppercase letter, a lowercase letter, and a number'
        return response
    }
    response.valid = true
    return response
}

export const login = createAsyncThunk(
    'user/login',
    async (arg, thunkAPI) => {
        const { userInput } = (thunkAPI.getState() as any).user
        const { valid, message } = validateUser(userInput, false)
        if (valid) {
            const data = await UserRepository.login(userInput)
            setAuthInfo(data)
            return data.user
        }
        thunkAPI.dispatch(uiActions.showToast(message))
        return thunkAPI.rejectWithValue(message)
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (arg, thunkAPI) => {
        const { userInput } = (thunkAPI.getState() as any).user
        const { valid, message } = validateUser(userInput)
        if (valid) {
            const data = await UserRepository.register(userInput)
            setAuthInfo(data)
            return data.user
        }
        thunkAPI.dispatch(uiActions.showToast(message))
        return thunkAPI.rejectWithValue(message)
    }
)

export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async (arg, thunkAPI) => {
        const { user } = (thunkAPI.getState() as any).user
        const data = await UserRepository.refreshToken({
            user: user,
            accessToken: LocalStorageService.getAccessToken(),
            refreshToken: LocalStorageService.getRefreshToken()
        })
        return data
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (arg, thunkAPI) => {
        const { user } = (thunkAPI.getState() as any).user
        const data = await UserRepository.logout({
            user: user,
            accessToken: LocalStorageService.getAccessToken(),
            refreshToken: LocalStorageService.getRefreshToken()
        })
        return data.user
    }
)

const setAuthInfo = (authInfo: IAuthInfo) => {
    LocalStorageService.setUser(authInfo.user)
    LocalStorageService.setAccessToken(authInfo.accessToken)
    LocalStorageService.setRefreshToken(authInfo.refreshToken)
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserByAttribute: (state, action: PayloadAction<{ key: keyof IUserInput, value: string }>) => {
            state.userInput[action.payload.key] = action.payload.value
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        initUserInput: (state) => {
            state.userInput = {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload
                state.isLoggedIn = true
            }
        })
        builder.addCase(register.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload
                state.isLoggedIn = true
            }
        })
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            if (action.payload) {
                const data = action.payload
                LocalStorageService.setAccessToken(data.accessToken)
                LocalStorageService.setRefreshToken(data.refreshToken)
            }
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            if (action.payload) {
                LocalStorageService.removeAccessToken()
                LocalStorageService.removeRefreshToken()
                LocalStorageService.removeUser()
                state.isLoggedIn = false
            }
        })
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer