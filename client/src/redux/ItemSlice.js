import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    items: []
};

const itemsSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        fetchItems:(state, action)=>{
            state.isLoading = action.payload.isLoading
            state.items = action.payload.items
        }
    }
})

export const { fetchItems } = itemsSlice.actions;
export default itemsSlice.reducer;