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

export const getRoomColor = (code: string) => {
  const defaultValue = '#999999';
  switch (code) {
    case 'A':
      return '#82AAFF';
    case 'B':
      return '#F07178';
    case 'C':
      return '#F9C66A';
    default:
      return defaultValue;
  }
};