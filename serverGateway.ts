import { IUser, EmptyUser, MongoObject, TokenType} from "./global"
import { get, post } from "./global/httpRequestUtils"

/** In development mode (locally) the server is at localhost:5000*/
const development = true;

export const endpoint = 'http://localhost:5000/';
const baseEndpoint = endpoint

/** This is the path to the nodes microservice */
const servicePath = 'user/'

export const createUser = async (user: IUser): Promise<IUser | string> => {
    try {
    console.log('create user: ', user, baseEndpoint + servicePath + 'create')
      const result = await post<IUser>(baseEndpoint + servicePath + 'create', {
        user: user,
      })
      return result
    } catch (exception) {
      return "failed"
    }
}

export const fetchUsers = async (): Promise<IUser[] | string> => {
    try {
        return await get<IUser[]>(
          baseEndpoint + servicePath + 'users'
        )
      } catch (exception) {
    return "failed"
    }
}

export const fetchUser = async(username : string, password: string) : Promise<[IUser, string]> => {
  try {
    console.log('fetch user: ', username, baseEndpoint + servicePath + 'user')
    let user = await post<MongoObject>(baseEndpoint + servicePath + 'user', {
      username: username,
      password: password
    });
    if (user.user != undefined) {
      return [user.user, "success"]
    } else {
      return [new EmptyUser(), "failed"]
    }
  } catch (exception) {
    return [new EmptyUser(), "failed"]
  }
}

export const saveTokens = async (username: string, tokens : TokenType[], newBalance: number) => {
  try {
    console.log("Saving Tokens...")
    await post(baseEndpoint + servicePath + 'savetokens', {
      tokens: tokens,
      username: username,
      newBalance: newBalance
    })
    ;
  } catch (exception) {
    console.log(exception)
  }
}

export const saveWatchlist = async (username: string, watchList : TokenType[]) => {
  try {
    await post(baseEndpoint + servicePath + 'savewatchlist', {
      username: username,
      newWatchList : watchList
    })
  } catch (exception) {
    console.log(exception)
  }
}