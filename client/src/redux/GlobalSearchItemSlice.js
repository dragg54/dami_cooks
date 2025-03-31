import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: null,
};

const globalSearchItemSlice = createSlice({
    name: 'globalSearchItem',
    initialState,
    reducers: {
        changeSearchQuery:(state, action) => {
            state.searchQuery = action.payload
        }
    }
})

export const { changeSearchQuery } = globalSearchItemSlice.actions;
export default globalSearchItemSlice.reducer;