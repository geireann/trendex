/**
 * Interface representing a user
 */
import { Sport } from "./globalEnums"

/**
 * Class representing a token belonging to a user, storing information about
 * its quantity, price per token, and of the name of the token.
 */
export class TokenType {
    name: string;
    quantity: number;
    price: number;

    constructor(name: string, quantity: number, price: number) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

export interface IUser {
    username: string,
    password: string,
    email: string,
    balance: number,
    tokens: Array<TokenType>
}

/**
 * Class representing a response from a call for mongodb.find
 */
export interface MongoObject {
    user: IUser,
}

/**
 * Concrete implementation of an IUser, created to return in case of a failure to properly
 * fetch user from mongodb instance.
 */
export class EmptyUser implements IUser {
    username: string;
    password: string;
    email: string;
    balance: number;
    tokens: Array<TokenType>;

    constructor() {
        this.username = '';
        this.password = '';
        this.email = '';
        this.balance = 0;
        this.tokens = [];
    }
}

export interface IAthlete {
    id?: string;
    sport: Sport
    profileImageUrl: string,
    firstName: string,
    lastName?: string,
    tokenValue?: number,
}