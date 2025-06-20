// features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: true,
    message: null,
    success: null
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpened = true;
      state.message = action.payload.message;
      state.success = action.payload.success 
    },
    closePopup: (state) => {
      state.isOpened = false;
      state.message = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
