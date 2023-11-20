import base64 from 'base-64';
import { createSlice } from '@reduxjs/toolkit';

export const expireTime = 1000 * 60 * 5;

export const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false, // 인증 상태
    name: null,
    role: null, // 권한
    id: null,
    accessToken: null,
    expireTime: null,
    position: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      const token = action.payload.accessToken;
      const payload = token.substring(
        token.indexOf('.') + 1,
        token.lastIndexOf('.'),
      );
      const dec = JSON.parse(base64.decode(payload));
      state.authenticated = true;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
      state.role = dec.role;
      state.position = action.payload.position;
      state.expireTime = new Date().getTime() + expireTime;
    },
    delAccessToken: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.role = null;
      state.name = null;
      state.id = null;
      state.expireTime = null;
      state.position = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
