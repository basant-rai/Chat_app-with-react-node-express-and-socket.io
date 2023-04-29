import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jsCookie from "js-cookie";
import { AppConfig } from "../../config/app.config";
import axiosInstance from "../../utils/AxiosInstance";
// import axiosInstance from "../../utils/AxiosInstance";

interface AuthState {
  token?: string
  user?: string
}

const initialState: AuthState = {
  token: undefined,
  user: undefined
}

export const logIn = createAsyncThunk(
  'login',
  async (payload: any): Promise<any> => {
    // console.log(payload);

    try {
      const { data } = await axios.post(`${AppConfig.api_url}/login`, {
        email: payload.email,
        password: payload.password
      })
      localStorage.setItem('access_token', data.access_token);
      jsCookie.set('refresh_token', data.refresh);
      return {
        success: true,
        message: "Successfully logged in!",
        data: { token: data.access_token }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.error,
      }
    }
  }
)

export const getSession = createAsyncThunk(
  'get_token',
  async (): Promise<any> => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return {
        success: true,
        message: "Access token found",
        data: { token: accessToken }
      }
    } else {
      return {
        success: false
      }
    }
  }
)


export const getAuthUser = createAsyncThunk(
  'getAuthUser',
  async (): Promise<any> => {
    // console.log(token)
    try {
      const user = await axiosInstance.get(`${AppConfig.api_url}/auth-user`)
      // console.log(user);

      return {
        success: true,
        message: "Auth user data ",
        data: { auth_user: user.data }
      }
    } catch (error: any) {
      return {
        success: false

      }
    }
  }
)

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<any>) => {
      // console.log(action.payload);
      state.user = action.payload;
    },
    accessToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(logIn.fulfilled, (state, action) => {
      // console.log(action)
      // const payloadAttr = action.payload.data;
      // state.token = payloadAttr.token
    })
    builder.addCase(getSession.fulfilled, (state, action) => {
      // console.log(action.payload,'reducers-session')
      // if (state.token) {
      state.token = action.payload.data.token
      // }
      // console.log(state.token)
    })
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      const payloadAttr = action.payload.data
      state.user = payloadAttr;
    })
  }

})

export const { authUser, accessToken } = AuthSlice.actions
export default AuthSlice.reducer;