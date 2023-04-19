import styled from '@emotion/styled';

const ScrollToTopBtn = () => {
  return (
    <ToTopBtn
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}></ToTopBtn>
  );
};

const ToTopBtn = styled.button`
  background: url('/images/icon/scroll-top.svg') no-repeat;
  background-color: #282828;
  background-position: 50% 50%;
  background-size: 40%;
  border-radius: 20rem;
  width: 4rem;
  height: 4rem;
  border: none;
  position: fixed;
  z-index: 600;
  bottom: 5%;
  right: 5%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  cursor: pointer;
`;

export default ScrollToTopBtn;
