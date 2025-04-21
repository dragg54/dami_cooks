import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchToCart: (state, action) =>{
      let items = action.payload.items
      if(!items){
        items = []
      }
      state.cartItems = [...items]
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        let cartItem = {}
        cartItem["item"] = item
        cartItem["quantity"] = 1
        state.cartItems.push(cartItem);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.item.id !== action.payload.id);
      const localStorageCartItems = localStorage.getItem("cartItems")
      const parsedCartItems = JSON.parse(localStorageCartItems)
      if(parsedCartItems && parsedCartItems.length > 0){
        localStorage.setItem(JSON.stringify(state.cartItems))
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.item.id === action.payload.item.id);
      if (item) {
        item.quantity += 1;
        const localStorageCartItems = localStorage.getItem("cartItems")
        const parsedCartItems = JSON.parse(localStorageCartItems)
        if(parsedCartItems && parsedCartItems.length > 0){
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.item.id === action.payload.item.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const localStorageCartItems = localStorage.getItem("cartItems")
        const parsedCartItems = JSON.parse(localStorageCartItems)
        if(parsedCartItems && parsedCartItems.length > 0){
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
      }
    },
    clearCart:(state) =>{
      state.cartItems = []
    }
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, fetchToCart } = cartSlice.actions;
export default cartSlice.reducer;
