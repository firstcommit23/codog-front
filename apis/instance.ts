import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const Instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CODOG_BACK_URL,
  timeout: 3000,
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
  const token = localStorage.getItem('accessToken') || '';

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
  async (error) => {
    const originalRequest = error.config;

    // If the response is a 401 error and the request has not already been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get the saved refresh token
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        // Request a new access token using the refresh token
        const response = await axios.get(`${process.env.NEXT_PUBLIC_CODOG_BACK_URL}/users/token`, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.response;
        //console.log('new! ', newAccessToken, newRefreshToken);

        // Save the new access token and refresh token
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Update the authorization header with the new access token
        Instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return Instance(originalRequest);
      } catch (error) {
        // If the refresh token is invalid, redirect to the login page
        console.error(error);
        window.location.href = '/login';
      }
    }

    // If the error is not a 401 error, return it as-is
    return Promise.reject(error);
  }
);
export default Instance;
