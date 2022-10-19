import Instance from './instance';

export const getUserProfile = () => {
  Instance.get('/users/profile').then((res) => res.data.data || []);
};

export const postSiginupGithubid = (githubId: string) => {
  return Instance.post('/users/sign-up/github-id', { githubId }).then((res) => res.data.response);
};
