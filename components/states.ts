import { atom } from 'recoil';

const userState = atom({
  key: 'USER',
  default: {
    email: '',
    nickname: '',
    githubId: '',
  },
});

const modalState = atom({
  key: 'MODAL',
  default: {
    isShow: false,
    title: '',
    content: '',
  },
});
export { userState, modalState };
