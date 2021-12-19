import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUrl } from '../../env'

const initialState = {
  productList: [],
}

const header = {
    'Accept': 'application/json'
}

const formHeader = {
  "Content-Type": 'multipart/form-data',
  "Accept": 'application/json'
}

export const productList = createAsyncThunk(
    'products/list',
    async () => {
        try {
            const response = await fetch(apiUrl + 'products', {
                method: 'GET',
                headers: header
            })
            const data = await response.json()
            return data
        }
        catch (err) {
            console.log("CATCH");
          }
    }
)

export const createProduct = createAsyncThunk('products/create', async (productData, {rejectWithValue}) => {
  try {
    formHeader['Authorization'] = "Bearer " + productData.token
    const response = await fetch(apiUrl + 'products/create', {
      method: 'POST',
      body: JSON.stringify(productData.data),
      headers: formHeader,
    })

    const data = await response.json()
    return data
  }
  catch (err) {
    return rejectWithValue('Opps there seems to be an error')
  }
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productList.fulfilled, (state, action) => {
        state.productList = action.payload
    })
  }
})

export const selectProductList = state => state.products.productList
export default productSlice.reducer