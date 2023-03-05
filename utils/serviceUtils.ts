import jwt_decode from 'jwt-decode';
import { getToken } from '@/apis/api';

export const loginCheck = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    location.href = '/login';
  }
};

export const checkToken = async (token: string) => {
  if (token) {
    const decodeToken: { id: string; exp: number; iat: number } = jwt_decode(token);
    if (decodeToken.exp < Date.now()) {
      const result = await getToken();

      if (result) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        return result.accessToken;
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }
  return token;
};
