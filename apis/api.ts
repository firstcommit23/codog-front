import axios from 'axios';
import Instance from './instance';
import type { User } from './type';

export const getUserProfile = () => {
  return Instance.get('/users/detail')
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const postSiginupGithubid = (githubId: string) => {
  return Instance.post('/users/sign-up/github-id', { githubId }).then((res) => res.data.response);
};

export const getRandomNickname = () => {
  return Instance.get('/users/nickname/new')
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const postSighupNickname = (user: User) => {
  return Instance.post('/users/sign-up', user).then((res) => res.data.response);
};

export const postSighupUser = (nickname: string) => {
  return Instance.post('/users/detail', { nickname: nickname }).then((res) => res.data.response);
};

export const postAuthorizationMail = (email: string) => {
  return Instance.post('/users/email/authorization-mail', { email: email }).then(
    (res) => res.data.response
  );
};

export const getFootprint = (year: string, month: string) => {
  return Instance.get(`/footprints?year=${year}&month=${month}`)
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const getEmailAuthorization = (email: string, token: string) => {
  return axios
    .get(`http://localhost:8080/users/email/authorization?email=${email}&token=${token}`)
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const getToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios
    .get('http://localhost:8080/users/token', {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    .then((res) => res.data.response)
    .catch((error) => error.response);
};
