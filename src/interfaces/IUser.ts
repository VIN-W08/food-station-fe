export interface IUser {
    _id: string
    name: string
    email: string
    password: string
}

export interface IAuthInfo {
    user: IUser,
    accessToken: string,
    refreshToken: string
}

export interface IUserInput {
    name: string
    email: string
    password: string
}