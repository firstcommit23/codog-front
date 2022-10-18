import styled from '@emotion/styled';
import Header from '@/components/Header';
import React from 'react';
import { Common } from '@/styles/common';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f5f5;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 5rem;
  max-width: ${Common.maxWidth};
  margin: 0 auto;
  background: #ffffff;
`;
export default DefaultLayout;
