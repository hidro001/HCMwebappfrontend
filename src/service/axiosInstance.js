
import axios from 'axios';

const baseServerUrl = import.meta.env.VITE_API_BASE_URL; 

const baseURL = `${baseServerUrl}/api/v1`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});





// Add a request interceptor to include the Authorization header if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

 // Set device type dynamically
 config.headers['x-device-type'] = "web"


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




export default axiosInstance;
