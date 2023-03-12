import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Common } from '@/styles/common';
import Image from 'next/image';

const Header = ({ isShowMenu = true }: { isShowMenu?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  return (
    <Container>
      <HeaderBox>
        <HeaderArea>
          <LogoTitle>
            <div
              onClick={() => {
                router.push('/');
              }}>{`{Codog}`}</div>
          </LogoTitle>
          {isShowMenu && (
            <>
              <Menu>
                {isOpen ? (
                  <Image
                    src="/images/close.svg"
                    alt="close"
                    width="18px"
                    height="18px"
                    onClick={toggleMenu}
                  />
                ) : (
                  <Image
                    src="/images/menu.svg"
                    width="25px"
                    height="18px"
                    alt="menu"
                    onClick={toggleMenu}
                  />
                )}
              </Menu>
              <MenuList isOpen={isOpen}>
                <div
                  onClick={() => {
                    router.push('/');
                  }}>
                  홈
                </div>
                <div
                  onClick={() => {
                    router.push('/mypage/profile');
                  }}>
                  마이페이지
                </div>
                <div
                  onClick={() => {
                    router.push('/');
                  }}>
                  코독에 대하여...
                </div>
                <div
                  onClick={() => {
                    router.push('/');
                  }}>
                  공지사항
                </div>
                <div
                  onClick={() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    router.push('/login');
                  }}>
                  로그아웃
                </div>
              </MenuList>
            </>
          )}
        </HeaderArea>
      </HeaderBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderBox = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  max-width: 450px;
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

  div {
    text-decoration: none;
    color: white;
  }

  div:visited {
    color: white;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MenuList = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 2rem 3rem 0 3rem;
  font-size: 2.2rem;
  gap: 3rem;
  background-color: ${Common.colors.black};
  color: ${Common.colors.white};
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 0;

  div {
    font-weight: 400;
    text-decoration: none;
    color: white;
    cursor: pointer;
  }

  div:hover {
    transition: all 0.3s ease-in-out;
    color: ${Common.colors.gray} !important;
    cursor: pointer;
  }

  div:visited {
    color: ${Common.colors.white};
  }
`;

export default Header;
