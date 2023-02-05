import axios, { AxiosInstance } from 'axios';
import { checkToken } from '@/utils/ServiceUtils';

const Instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

Instance.interceptors.request.use(
  async (config) => {
    const token = await checkToken(localStorage.getItem('accessToken') || '');

    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    return await Promise.resolve(config);
  },
  (error) => {
    if (error.response.status === 401) {
      return {
        redirect: {
          destination: '/login',
        },
      };
    }
    return Promise.reject(error);
  }
);

export default Instance;
