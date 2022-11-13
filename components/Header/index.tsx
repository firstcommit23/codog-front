import styled from '@emotion/styled';
import { Common } from '@/styles/common';
import Image from 'next/image';

const Header = () => {
  return (
    <Container>
      <HeaderBox>
        <HeaderArea>
          <LogoTitle>{`{Codog}`}</LogoTitle>
          <Menu>
            <Image src="/images/menu.svg" width="25px" height="18px" alt="menu" />
          </Menu>
        </HeaderArea>
      </HeaderBox>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderBox = styled.div`
  position: fixed;
  width: 480px;
  height: 60px;
  top: 0px;
  background: ${Common.colors.black};
`;
const HeaderArea = styled.div`
  max-width: ${Common.maxWidth};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
`;
const LogoTitle = styled.div`
  font-family: 'Fira Code', monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.9rem;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
