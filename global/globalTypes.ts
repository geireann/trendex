import { Sport } from "./globalEnums"

export interface IUser {
    username: string,
    password: string,
    email: string,
    tokens?: Map<string, number>
}

export interface IAthlete {
    id?: string;
    sport: Sport
    profileImageUrl: string,
    firstName: string,
    lastName?: string,
    tokenValue?: number,
}