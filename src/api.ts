import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_API || 'http://localhost:3002',
   paramsSerializer: {
      serialize: function (params: any) {
         return qs.stringify(params);
      },
   },
});

axiosInstance.interceptors.request.use(
   async (config: any) => {
      const token = localStorage.getItem('token');
      config.headers['Content-Type'] = 'application/json';
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error: any) => {
      return Promise.reject(error);
   },
);

axiosInstance.interceptors.response.use(
   (response) => {return response},
   async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
      }
      if (error.response && error.response.status === 500) {
         console.error('Internal server error', error.response.data);
      }
      return Promise.reject(error);
   },
);

export default axiosInstance;