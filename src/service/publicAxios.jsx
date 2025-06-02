// // src/api/publicAxios.jsx
// import axios from 'axios';

// const publicAxios = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
//   headers: { 'Content-Type': 'application/json' },
// });

// export default publicAxios;


// src/api/publicAxios.jsx
import axios from 'axios';

const publicAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach device type on every public request
publicAxios.interceptors.request.use(
  (config) => {
    config.headers['x-device-type'] = 'web';
    return config;
  },
  (error) => Promise.reject(error)
);

export default publicAxios;
