import styled from '@emotion/styled';
import { Common } from '@/styles/common';

const Header = () => {
  return (
    <Container>
      <HeaderBox>
        <HeaderArea>
          <LogoTitle>{`{Codog}`}</LogoTitle>
        </HeaderArea>
      </HeaderBox>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 60px;
`;
const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0px;
  top: 0px;
  background: ${Common.colors.black};
`;
const HeaderArea = styled.div`
  width: calc(100% - 2rem);
  max-width: ${Common.maxWidth};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;
const LogoTitle = styled.div`
  font-family: 'Fira Code', monospace;
  font-style: normal;
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.9rem;
  color: #ffffff;
`;

export default Header;
