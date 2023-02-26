import { atom } from 'recoil';

const userState = atom({
  key: 'USER',
  default: {
    email: '',
    nickname: '',
    githubId: '',
    character: '',
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
