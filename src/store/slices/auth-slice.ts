import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, LoginRequest, signUp, SignUpRequest } from '../../requests/authService'
import { persistToken, readToken } from '../../services/localStorage.service'

export interface AuthSlice {
  token: string
}

const initialState: AuthSlice = {
  token: readToken()
}

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: LoginRequest) =>
  login(loginPayload).then((res) => {
    persistToken(res.token)

    return res.token
  })
)

export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) => signUp(signUpPayload))

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload
    })
    builder.addCase(doSignUp.fulfilled, (state, action) => {
      const userData = action.payload?.['0'] // Truy cập dữ liệu người dùng nếu payload không undefined
      if (userData) {
        state.token = userData
      } else {
        console.error('User data not found in the payload.')
      }
    })
    // builder.addCase(doLogout.fulfilled, (state) => {
    //   state.token = ''
    // })
  }
})

export default authSlice.reducer
