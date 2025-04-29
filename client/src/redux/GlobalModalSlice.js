import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opened: false,
    component: null,
    props: {}
};

const globalModalSlice = createSlice({
    name: 'globalModal',
    initialState,
    reducers: {
        openModal:(state, action) => {
            state.opened = true
            state.component = action.payload?.component
            state.props = action.payload?.props
        },
        closeModal: (state) => {
            state.opened = false
        }
    }
})

export const { openModal, closeModal } = globalModalSlice.actions;
export default globalModalSlice.reducer;