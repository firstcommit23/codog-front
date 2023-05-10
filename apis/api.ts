import axios from 'axios';
import Instance from './instance';
import type { User } from './type';

export const getUserProfile = () => {
  return Instance.get('/users/profile')
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const getUserProfileDetail = () => {
  return Instance.get('/users/profile/detail')
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const postSiginupGithubid = (githubId: string) => {
  return Instance.post('/users/sign-up/github-id', { githubId }).then((res) => res.data.response);
};

export const getCharacter = () => {
  return Instance.get('/codes/character')
    .then((res) => res.data.response)
    .catch((error) => error.response);
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
  return Instance.post('/users/profile', {
    characterCode: user.character,
    nickname: user.nickname,
  }).then((res) => res.data.response);
};

export const deleteDropOutUser = () => {
  return Instance.delete('/users/drop-out').then((res) => res.data.response);
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

export const getTotalItems = () => {
  return Instance.get(`/codes/item`)
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const putProfileItem = (itemCodes: string[]) => {
  return Instance.put('/users/profile/item', {
    itemCodes,
  }).then((res) => res.data.response);
};

export const putCheerCount = (cheerCount: number) => {
  return Instance.put(`/users/profile/cheer-count`, {
    cheerCount,
  }).then((res) => res.data.response);
};

export const getEmailAuthorization = (email: string, token: string) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_CODOG_BACK_URL}/users/email/authorization?email=${email}&token=${token}`
    )
    .then((res) => res.data.response)
    .catch((error) => error.response);
};

export const getToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios
    .get(`${process.env.NEXT_PUBLIC_CODOG_BACK_URL}/users/token`, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    .then((res) => res.data.response);
  // .catch((error) => error.response);
};

export const getComments = ({
  footprintId,
  count,
  id,
  created_at,
}: {
  footprintId: number;
  count: number;
  id?: number;
  created_at?: string;
}) => {
  return Instance.get(`comments`, {
    params: {
      footprintId,
      count,
      ...(id && { cursorCommentId: id }),
      ...(created_at && { cursorCreatedAt: created_at }),
    },
  }).then((res) => res.data.response);
  // .catch((error) => error.response);
};

export const postComment = ({
  footprintId,
  contents,
}: {
  footprintId: number;
  contents: string;
}) => {
  return Instance.post(`/comments`, { footprintId, contents }).then((res) => res.data.response);
};

export const deleteComment = (commentId: number) => {
  return Instance.delete(`/comments/${commentId}`).then((res) => res.data.response);
};

export const getShare = (githubId: string) => {
  return Instance.get(`/users/share-house/${githubId}`, {}).then((res) => res.data.response);
  // .catch((error) => error.response);
};
