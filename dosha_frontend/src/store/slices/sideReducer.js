import { createSlice } from '@reduxjs/toolkit';

export const sideSlice = createSlice({
  name: 'sideFold',
  initialState: {
    isFolded: true,
    index: 0,
  },
  reducers: {
    fold: (state, action) => {
      state.isFolded = !state.isFolded;
    },
    move: (state, action) => {
      state.index = action.payload;
    },
    reset: (state, action) => {
      state.isFolded = true;
      state.index = 0;
    },
  },
});

export const sideReducer = sideSlice.reducer;
export const sideActions = sideSlice.actions;
