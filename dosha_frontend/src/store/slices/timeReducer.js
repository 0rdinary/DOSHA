import { createSlice } from '@reduxjs/toolkit';

export const timeSlice = createSlice({
  name: 'logoutTime',
  initialState: {
    remainTime: 300,
  },
  reducers: {
    resetTime: (state, action) => {
      state.remainTime = 300;
    },
    passTime: (state, action) => {
      state.remainTime -= 1;
    },
    setTime: (state, action) => {
      state.remainTime = action.payload;
    },
  },
});

export const timeReducer = timeSlice.reducer;
export const timeActions = timeSlice.actions;
