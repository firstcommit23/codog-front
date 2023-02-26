import styled from '@emotion/styled';
import Header from '@/components/Header';
// import Menu from '@/components/Menu';
import Modal from '@/components/Modal';
import React from 'react';
import { Common } from '@/styles/common';

interface Props {
  isShowMenu?: boolean;
  children: React.ReactNode;
  backgroundColor?: string;
}

const DefaultLayout = ({ children, isShowMenu = true, backgroundColor }: Props) => {
  return (
    <Wrapper>
      {/* <Menu /> */}
      <Modal />
      <Header isShowMenu={isShowMenu} />
      <Container color={backgroundColor}>{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: #f5f5f5;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0; //4rem 3rem 7rem 3rem;
  max-width: ${Common.maxWidth};
  margin: 0 auto;
  box-sizing: border-box;
  height: 100vh;
  background: ${(props) => `${props.color ? props.color : '#ffffff'}`};
`;
export default DefaultLayout;
