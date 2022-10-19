import { atom } from 'recoil';

const userState = atom({
  key: 'USER',
  default: {
    email: '',
    nickname: '',
    githubId: '',
  },
});

export { userState };
