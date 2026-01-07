import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    order: {
      read: 0,
      unread: 0,
      hasLoaded: false
    },
    booking: {
      read: 0,
      unread: 0,
      hasLoaded: false
    }
  },
  reducers: {
    fetchNotifications: (state, action) => {
      state.order.unread = action.payload?.order?.length
      state.booking.unread = action.payload?.booking?.length
    },
    readNotifications: (state, action) => {
      if(action.payload == "order"){
        state.order.unread = 0
      }
      else if(action.payload == "booking"){
        state.booking.unread = 0
      }
    },
    addNotification: (state, action) => {
      if (action.payload == "order") {
        state.order.unread = Number(state.unread) + 1
      }
      else if (action.payload == "booking") {
        state.booking.unread = Number(state.unread) + 1
      }
    }
  },
});

export const { fetchNotifications, readNotifications, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;