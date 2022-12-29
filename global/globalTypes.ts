export interface IUser {
    username: string,
    password: string,
    email: string,
    tokens?: Map<string, number>
}