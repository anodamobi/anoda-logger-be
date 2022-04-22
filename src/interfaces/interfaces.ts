
export interface IUserAuthenticationPayload {
  id: string,
  email?: string
  lastName?:         string,
  firstName?:        string
}

export type TUserAuth = {
  user: IUserRes,
  auth: IAuth
  isNewUser: boolean
}

export interface IUserRes {
  _id:          string,
  firstName:   string,
  lastName:    string,
  email:       string,
}

export interface IAuth {
  jwt: string,
  expiresIn: number
}
