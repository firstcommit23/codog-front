import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { checkToken } from '@/utils/serviceUtils';

const Instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CODOG_BACK_URL,
});

// Rate Limiter
axiosRetry(Instance, {
  retries: 5,
  retryDelay: (retry) => {
    const delay = Math.pow(2, retry) * 100;
    const jitter = delay * 0.1 * Math.random();
    return delay + jitter;
  },
  retryCondition: (err) =>
    axiosRetry.isNetworkOrIdempotentRequestError(err) || err.response?.status === 429,
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
