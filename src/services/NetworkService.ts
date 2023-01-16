import axios from "axios"
import { store } from "../app/store"
import { uiActions } from "../features/uiSlice"
import { refreshToken } from "../features/userSlice"
import { LocalStorageService } from "./LocalStorageService"

type httpMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
})

axiosInstance.interceptors.response.use(undefined, async (err) => {
    if (err.response.status === 401) {
        const { message } = err.response.data.status
        if (message === 'token_expire') {
            await store.dispatch(refreshToken())
            const token = LocalStorageService.getAccessToken()
            const { config: previousReq } = err
            const res = await axios.request({
                ...previousReq,
                headers: { ...headers, 'authorization': `Bearer ${token}` }
            })
            return res
        }
    }
    return Promise.reject(err)
})

export class NetworkService {
    static req = async (method: httpMethod, url: string, data: any = {}): Promise<any> => {
        store.dispatch(uiActions.setIsLoading(true))
        const token = LocalStorageService.getAccessToken()
        const reqHeaders = { ...headers, 'authorization': `Bearer ${token}` }
        const res = method === 'get' ?
            await axiosInstance.request({ headers: reqHeaders, method: method, url: url, params: data }) :
            await axiosInstance.request({ headers: reqHeaders, method: method, url: url, data: data })
        store.dispatch(uiActions.setIsLoading(false))

        if (res.data.data) {
            return res.data.data
        } else {
            store.dispatch(uiActions.showToast(res.data.status.message))
        }
    }
}