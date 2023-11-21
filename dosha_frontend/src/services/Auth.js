import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
} from '../cookie/Cookie';
import { authActions } from '../store/slices/authReducer';
import { timeActions } from '../store/slices/timeReducer';

export const requestToken = async (refreshToken) => {
  try {
    const url = '/auth/refresh';
    const bearerRefreshToken = `Bearer ${refreshToken}`;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-REFRESH-TOKEN': bearerRefreshToken,
    };
    const response = await axios.post('/auth/refresh', null, {
      headers,
    });

    const data = {
      status: true,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      name: response.data.name,
    };
    return data;
  } catch (e) {
    const data = {
      status: false,
    };
    return data;
  }
};

export const checkToken = (key) => {
  const [isAuth, setIsAuth] = useState('Loaded');
  const { authenticated, accessToken, expireTime } = useSelector(
    (state) => state.authReducer,
  );
  const refreshToken = getRefreshToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      if (refreshToken === undefined) {
        dispatch(authActions.delAccessToken());
        setIsAuth('Failed');
      } else {
        setIsAuth('Success');

        if (authenticated && new Date().getTime() < expireTime) {
          setIsAuth('Success');
        } else {
          const response = await requestToken(refreshToken);

          if (response.status) {
            dispatch(authActions.setAccessToken(response));
            setRefreshToken(response.refreshToken);
            dispatch(timeActions.resetTime());
            setIsAuth('Success');
          } else {
            dispatch(authActions.delAccessToken());
            removeRefreshToken();
            setIsAuth('Failed');
          }
        }
      }
    };
    checkAuthToken();
  }, [refreshToken, dispatch, key]);

  return {
    isAuth,
  };
};

export const requestLogin = async ({ id, password }) => {
  try {
    const response = await axios.post('52.78.107.61:8080/auth/login', {
      id,
      password,
    });
    console.log(response);
    const { accessToken, refreshToken, name, position } = response.data;
    return {
      status: true,
      accessToken,
      refreshToken,
      position,
      name,
      id: response.data.id,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
