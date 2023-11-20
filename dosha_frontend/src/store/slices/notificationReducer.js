import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    count: 1,
    notifications: null, // 알림 목록
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.count = action.payload.length;
    },
    delNotifications: (state, action) => {
      state.count -= 1;
      state.notifications.forEach((item, index) => {
        if (item.id === action.payload) {
          state.notifications.splice(index, 1);
        }
      });
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
