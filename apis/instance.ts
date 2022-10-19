import axios, { AxiosInstance } from 'axios';

const Instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    return Promise.resolve(config);
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
