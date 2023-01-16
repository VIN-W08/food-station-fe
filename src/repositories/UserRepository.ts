import { IAuthInfo, IUser } from "../interfaces/IUser"
import { NetworkService } from "../services/NetworkService"

export class UserRepository {
    static register = async (body: IUser): Promise<IAuthInfo> => {
        const response = await NetworkService.req('post', '/user/register', body)
        return response
    }

    static login = async (body: IUser): Promise<IAuthInfo> => {
        const response = await NetworkService.req('post', '/user/login', body)
        return response
    }

    static refreshToken = async (body: IAuthInfo): Promise<IAuthInfo> => {
        const response = await NetworkService.req('post', '/user/refreshToken', body)
        return response
    }

    static logout = async (body: IAuthInfo): Promise<IAuthInfo> => {
        const response = await NetworkService.req('post', '/user/logout', body)
        return response
    }
}