import { IOrderFood } from "../interfaces/IOrder"
import { IUser } from "../interfaces/IUser"

export class LocalStorageService {
    static setAccessToken = (token: string) =>
        localStorage.setItem('fs-access-token', token)

    static getAccessToken = (): string =>
        localStorage.getItem('fs-access-token') || ''

    static removeAccessToken = () =>
        localStorage.removeItem('fs-access-token')

    static setRefreshToken = (token: string) =>
        localStorage.setItem('fs-refresh-token', token)

    static getRefreshToken = (): string =>
        localStorage.getItem('fs-refresh-token') || ''

    static removeRefreshToken = () =>
        localStorage.removeItem('fs-refresh-token')

    static setUser = (user: IUser) =>
        localStorage.setItem('fs-user', JSON.stringify(user))

    static getUser = (): IUser => JSON.parse(localStorage.getItem('fs-user') || '')

    static removeUser = () =>
        localStorage.removeItem('fs-user')
}