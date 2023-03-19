import styled from '@emotion/styled';
import Header from '@/components/Header';
// import Menu from '@/components/Menu';
import Modal from '@/components/Modal';
import React from 'react';
import { Common } from '@/styles/common';

interface Props {
  isShowMenu?: boolean;
  children: React.ReactNode;
  height?: string;
  backgroundColor?: string;
}

const DefaultLayout = ({ children, isShowMenu = true, backgroundColor, height }: Props) => {
  return (
    <Wrapper>
      <Modal />
      <Header isShowMenu={isShowMenu} />
      <Container color={backgroundColor} height={height}>
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: auto 0;
  background: #f5f5f5;
`;

const Container = styled.div<{ height?: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: ${Common.maxWidth};
  margin: 0 auto;
  box-sizing: border-box;
  letter-spacing: -0.2px;
  height: ${(props) => `${props.height ? props.height : '100%'}`};
  background: ${(props) => `${props.color ? props.color : '#ffffff'}`};
`;
export default DefaultLayout;
