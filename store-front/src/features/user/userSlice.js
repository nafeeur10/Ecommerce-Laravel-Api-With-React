import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUrl } from '../../env'

const initialState = {
  user: null,
  authToken: null
}

const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const createNewUser = createAsyncThunk(
    'user/create',
    async (user, {rejectWithValue}) => {
        try {
            const response = await fetch(apiUrl + 'register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: header
            })

            const data = await response.json()
            return data
        }
        catch (err) {
            return rejectWithValue('Opps there seems to be an error')
          }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (user, {rejectWithValue}) => {
        try {
            const response = await fetch(apiUrl + 'login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: header
            })

            const data = await response.json()
            return data
        }
        catch (err) {
            return rejectWithValue('Opps there seems to be an error')
          }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async ({rejectWithValue}) => {
        try {
            const response = await fetch(apiUrl + 'logout', {
                method: 'POST',
                headers: header
            })

            const data = await response.json()
            return data
        }
        catch (err) {
            return rejectWithValue('Opps there seems to be an error')
          }
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.authToken = action.payload.token
    })
    .addCase(createNewUser.rejected, (state, action) => {
        state.user = null
        state.authToken = null
    })
    .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.authToken = action.payload.token
    })
    .addCase(login.rejected, (state, action) => {
        state.user = null
        state.authToken = null
    })
    .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.authToken = null
    })
  }
})

export const selectUser = state => state.user.user
export const selectAuthToken = state => state.user.authToken
export default userSlice.reducer