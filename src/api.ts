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
      // const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwMjk0MDkyLCJpYXQiOjE3MjU2NTU0MDEsImV4cCI6MTcyODI0NzQwMX0.o4386lBtc1uJ36AcIags_j8CUIeN8-zc8j2KumHfwTw';
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

         // const refToken = localStorage.getItem('refreshToken');

         // if (!refToken) {
         //    localStorage.removeItem('accessToken');
         //    localStorage.removeItem('refreshToken');
         //    window.location.href = '/';
         //    return Promise.reject(error);
         // }

         // try {
         //    const response = await axios.post(
         //       `${axiosInstance.defaults.baseURL}auth/refresh`,
         //       {},
         //       {
         //          headers: {
         //             'Content-Type': 'application/json',
         //             Authorization: `Bearer ${refToken}`,
         //          },
         //       },
         //    );

            // const { accessToken, refreshToken } = response.data;

            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('refreshToken', refreshToken);

            // Retry the original request with the new token
            // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
         //    return axiosInstance(originalRequest);
         // } catch (e) {
         //    console.log(e);
            // If refresh token request fails, logout
            // localStorage.removeItem('accessToken');
            // localStorage.removeItem('refreshToken');
         //    window.location.href = '/';
         // }
      }

      if (error.response && error.response.status === 500) {
         console.error('Internal server error', error.response.data);
      }

      return Promise.reject(error);
   },
);

// export async function verifyCompletedQuest(quest: string) {
//    try {
//       const response = await axiosInstance.post('/quests/verify', {
//          quest,
//       });
//       return response.data;
//    } catch (error) {
//       console.error('Error verifying quest:', error);
//       throw error;
//    }
// }

export default axiosInstance;