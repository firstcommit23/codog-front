import styled from '@emotion/styled';
import Header from '@/components/Header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

export default DefaultLayout;
