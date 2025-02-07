import axiosInstance from "./axiosInstance";

import axios from 'axios';

const BASE_URL = 'https://hmback.onrender.com/api/v1/admin';


export const fetchSubordinates = (accessToken) => {
  return axios.get(`${BASE_URL}/subordinates`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const fetchBoth = (accessToken) => {
  return axios.get(`${BASE_URL}/both`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


