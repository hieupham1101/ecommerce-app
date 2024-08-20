import { httpApi } from './api'

export interface UserModel {
  id: number
  name: string
  imgUrl: string
  userName: string
  email: string
  email_verified_at: string
  phone: string
  address: string
  avatar: string
  level: number
  created_at: string
  updated_at: string
}

export interface AuthData {
  email: string
  password: string
}

export interface SignUpRequest {
  name: string
  email: string
  address: string
  phone: string
  level: string
  updated_at?: string
  created_at?: string
  id?: string
}

export interface ResetPasswordRequest {
  email: string
}

export interface SecurityCodePayload {
  code: string
}

export interface NewPasswordData {
  newPassword: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  Auth: UserModel
}

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>('/login', { ...loginPayload }).then(({ data }) => data)

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('/register', { ...signUpData }).then(({ data }) => data)

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data)

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data)

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data)
