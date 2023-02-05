import styled from '@emotion/styled';
import Header from '@/components/Header';
// import Menu from '@/components/Menu';
import Modal from '@/components/Modal';
import React from 'react';
import { Common } from '@/styles/common';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <Wrapper>
      {/* <Menu /> */}
      <Modal />
      <Header />
      <Container>{children}</Container>
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
  padding: 4rem 3rem 7rem 3rem;
  max-width: ${Common.maxWidth};
  margin: 0 auto;
  box-sizing: border-box;
  height: 100vh;
  background: #ffffff;
`;
export default DefaultLayout;
