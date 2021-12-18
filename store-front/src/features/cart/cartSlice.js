import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addToCart(state, action) {
        let itemDetails = action.payload
        let cartItems = [...state.cart]

        let foundFlag = 0
        for(let i = 0; i < cartItems.length; i++) {
            let single = cartItems[i]
            if(single.id === itemDetails.id) {
                single.qty += 1
                foundFlag = 1
                break
            }
        }
        if(!foundFlag) {
            let makeCartData = {
                id: itemDetails.id,
                name:itemDetails.name,
                price: itemDetails.price,
                image: itemDetails.image,
                qty: 1
            }
            void(state.cart = [...state.cart, makeCartData])
        }
        
      },
      clearCart(state, action) {
        void(state.cart = [])
      }
  }
})


export const selectCartItems = state => state.cart.cart
export const { addToCart, clearCart } = cartSlice.actions
export default cartSlice.reducer