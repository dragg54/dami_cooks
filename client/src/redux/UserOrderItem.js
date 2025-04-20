import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null
};

const userOrderItemSlice = createSlice({
    name: 'userOrderItem',
    initialState,
    reducers: {
        addUserOrderItem:(state, action)=>{
            state.id = action.payload.id
        },
        clearUserOrderItem:(state)=>{
            state.id = null
        }
    }
})

export const { addUserOrderItem, clearUserOrderItem } = userOrderItemSlice.actions;
export default userOrderItemSlice.reducer;