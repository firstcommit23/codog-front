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
type ModalType = {
  isShow: boolean;
  title: string;
  content: string;
  onClick?: any;
  isCancleButton?: boolean;
};

const modalState = atom<ModalType>({
  key: 'MODAL',
  default: {
    isShow: false,
    title: '',
    content: '',
    isCancleButton: false,
  },
});
export { userState, modalState };
