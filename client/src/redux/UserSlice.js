import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUser: (state, action) => {
            localStorage.setItem("authToken", action.payload.token)
            state.user = action.payload.user
            state.token = action.payload.token
        },
        clearUser: (state) =>{
            state.user ={}
            state.token = null
        }
    }
})

export const { fetchUser, clearUser } = userSlice.actions;
export default userSlice.reducer;