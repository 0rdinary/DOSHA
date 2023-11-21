import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  notificationActions,
  notificationReducer,
} from '../store/slices/notificationReducer';

export const requestNotification = ({ id, type }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [data, setData] = useState({});
  const url = process.env.REACT_APP_DB_HOST + '/api/notification/send';
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    const request = async () => {
      const response = await axios.post(
        url,
        {
          id,
          notiType: type,
        },
        {
          headers,
        },
      );
      setData(response);
    };
    request();
  }, []);

  return data;
};

export const getNotification = ({ id }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_DB_HOST + '/api/notification/get';
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(url, {
        params: { id },
        headers,
      });
      dispatch(notificationActions.setNotifications(response.data));
    };
    request();
    setLoading(false);
  }, []);

  return {
    loading,
  };
};

export const readNotification = ({ accessToken, id }) => {
  const url = process.env.REACT_APP_DB_HOST + '/api/notification/read';
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    const request = async () => {
      const response = await axios.post(
        url,
        {
          id,
        },
        {
          headers,
        },
      );
    };
    request();
    console.log('끝');
  }, []);

  return true;
};
