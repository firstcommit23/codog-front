import Instance from './instance';
import type { User } from './type';

export const getUserProfile = () => {
  return Instance.get('/users/profile').then((res) => res.data.data || []);
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

export const postSighupUser = (user: User) => {
  return Instance.post('/users/detail', { nickname: user.nickname }).then(
    (res) => res.data.response
  );
};

export const postAuthorizationMail = (email: string) => {
  return Instance.post('/users/email/authorization-mail', { email: email }).then(
    (res) => res.data.response
  );
};

export const getEmailAuthorization = (email: string, token: string) => {
  return Instance.get(`/users/email/authorization?email=${email}&token=${token}`)
    .then((res) => res.data.response)
    .catch((error) => error.response);
};
