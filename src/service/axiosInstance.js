
// import axios from 'axios';

// const baseServerUrl = import.meta.env.VITE_API_BASE_URL; 

// const baseURL = `${baseServerUrl}/api/v1`;

// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });



// // Add a request interceptor to include the Authorization header if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//  // Set device type dynamically
//  config.headers['x-device-type'] = "web"


//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );




// export default axiosInstance;


// import axios from 'axios';
// import useAuthStore from '../store/store';

// const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

// const axiosInstance = axios.create({
//   baseURL,
//   headers: { 'Content-Type': 'application/json' },
// });

// let redirecting = false;

// // request: attach token + device
// axiosInstance.interceptors.request.use(
//   cfg => {
//     const token = localStorage.getItem('accessToken');
//     if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
//     cfg.headers['x-device-type'] = 'web';
//     return cfg;
//   },
//   err => Promise.reject(err)
// );

// // response: clear only local state on 401/expired, then redirect once
// axiosInstance.interceptors.response.use(
//   res => res,
//   err => {
//     const status  = err.response?.status;
//     const message = err.response?.data?.message;

//     if (status === 401 || (status === 400 && message === 'jwt expired')) {
//       // 1️⃣ clear local state *only*
//       useAuthStore.getState().clearAuthState();

//       // 2️⃣ redirect once (if not already on /)
//       if (!redirecting && window.location.pathname !== '/') {
//         redirecting = true;
//         window.location.href = '/';
//       }

//       // 3️⃣ halt further promise chains
//       return new Promise(() => {});
//     }

//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;


import axios from 'axios';
import useAuthStore from '../store/store';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

let isRedirecting = false;

// 1️⃣ Request interceptor: cancel if no token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // 1) clear only local auth state
      useAuthStore.getState().clearAuthState();
      // 2) redirect once (if not already on login)
      if (!isRedirecting && window.location.pathname !== '/') {
        isRedirecting = true;
        window.location.href = '/';
      }
      // 3) cancel the request so no network call happens
      throw new axios.Cancel('No access token');
    }
    // If we have a token, attach it
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['x-device-type'] = 'web';
    return config;
  },
  error => Promise.reject(error)
);

// 2️⃣ Response interceptor: handle 401 / expired
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // 2.a If we canceled due to missing token, just reject and do nothing
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status  = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 || (status === 400 && message === 'jwt expired')) {
      // clear only local state (no recursive API calls)
      useAuthStore.getState().clearAuthState();

      // redirect once if not already on "/"
      if (!isRedirecting && window.location.pathname !== '/') {
        isRedirecting = true;
        window.location.href = '/';
      }

      // hang forever so no downstream .catch/.then runs
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
