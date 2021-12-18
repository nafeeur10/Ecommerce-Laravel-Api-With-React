import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUrl } from '../../env'

const initialState = {
  orderStatus: null
}

const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const createNewOrder = createAsyncThunk(
    'order/create',
    async (order, {rejectWithValue}) => {
        try {
            header['Authorization'] = "Bearer " + order.token
            const products = []
            products["products"] = order.cartItems
            const response = await fetch(apiUrl + 'orders/create', {
                method: 'POST',
                body: (products),
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderStatus = action.payload
    })
    .addCase(createNewOrder.rejected, (state, action) => {
        state.orderStatus = false
    })
  }
})

export default orderSlice.reducer