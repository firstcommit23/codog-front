import Instance from './instance';

export const getUserProfile = () => {
  Instance.get('/users/profile').then((res) => res.data.data || []);
};

export const getTest = () => {
  Instance.get('/test.json').then((res) => {
    console.log(res.data.response);
    return res.data.response || { email: '', name: '', github: '' };
  });
};
