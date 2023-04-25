import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { modalState } from '@/components/states';

const Modal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const { isShow, title, content, isCancleButton, onClick } = modal;

  const handleClose = () => {
    setModal({ ...modal, isShow: false });
  };
  const handleConfirm = () => {
    onClick && onClick();
    handleClose();
  };

  return (
    <>
      {isShow && (
        <Container>
          <ModalWrapper>
            <Text>{title}</Text>
            <SubText>{content}</SubText>
            <ButtonWrapper>
              <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
              {isCancleButton && <ConfirmButton onClick={handleClose}>취소</ConfirmButton>}
            </ButtonWrapper>
          </ModalWrapper>
        </Container>
      )}
    </>
  );
};

export default Modal;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background-color: white;
  width: 280px;
  height: 180px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 35%;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const SubText = styled.div`
  font-size: 15px;
  text-align: center;
  color: #8c8c8c;
  line-height: 1.5;
  margin: 15px 0 30px 0;
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 45px;
`;

const ConfirmButton = styled.button`
  font-size: 16px;
  color: white;
  width: inherit;
  background-color: #282828;
  border: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;
