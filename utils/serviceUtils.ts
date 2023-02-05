import jwt_decode from 'jwt-decode';
import { getToken } from '@/apis/api';

export const loginCheck = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    location.href = '/login';
  }
};

export const checkToken = async (token: string) => {
  let newAccessToken = token;
  if (token) {
    const decodeToken: { id: string; exp: number; iat: number } = jwt_decode(token);
    if (decodeToken.exp < Date.now()) {
      await getToken()
        .then((res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          newAccessToken = res.accessToken;
        })
        .catch((error) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        });
    }
  }
  return await newAccessToken;
};
