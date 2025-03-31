// features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: true,
    message: null,
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpened = true;
      state.message = action.payload.message;

    },
    closePopup: (state) => {
      state.isOpened = false;
      state.message = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
