import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    read:0,
    unread:0,
    hasLoaded: false
  },
  reducers: {
    fetchNotifications: (state, action) => {
      state.unread = action.payload?.length
    },
    readNotifications:(state) =>{
      state.unread = 0
    },
    addNotification:(state) =>{
      state.unread = Number(state.unread) + 1
    }
  },
});

export const { fetchNotifications, readNotifications, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;