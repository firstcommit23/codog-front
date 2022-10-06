import { atom } from 'recoil';

const userState = atom({
  key: 'USER',
  default: {
    email: '',
    nickname: '',
  },
});

export { userState };
