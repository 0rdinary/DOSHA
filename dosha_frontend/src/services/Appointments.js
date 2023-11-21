import axios from 'axios';

export const getAppointMents = async ({ id, accessToken }) => {
  try {
    const url = process.env.REACT_APP_DB_HOST + '/api/manager/appointments/get';
    const bearerAccessToken = `Bearer ${accessToken}`;
    const headers = {
      Authorization: bearerAccessToken,
    };
    const response = await axios.get(url, {
      params: { id },
      headers,
    });

    return {
      state: true,
      appointedDate: response.data.appointedDate,
    };
  } catch (e) {
    return {
      state: false,
      appointedDate: null,
    };
  }
};
