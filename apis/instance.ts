import axios, { AxiosError, AxiosInstance } from 'axios';
import { checkToken } from '@/utils/serviceUtils';

const Instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

Instance.interceptors.request.use(async (config) => {
  const token = await checkToken(localStorage.getItem('accessToken') || '');

  config.headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };
  return await Promise.resolve(config);
});

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      window.location.href = '/login';

      return new Promise(() => {});
    }
    return Promise.reject(error);
  }
);
export default Instance;
