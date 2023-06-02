import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Common } from '@/styles/common';
import Image from 'next/image';

const Header = ({ isShowMenu = true }: { isShowMenu?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  useEffect(() => {
    setIsLogin(localStorage.getItem('accessToken') ? true : false);
  }, []);

  return (
    <Container>
      <HeaderBox>
        <HeaderArea>
          <LogoTitle>
            <div
              onClick={() => {
                if (isLogin) {
                  router.push('/main');
                } else {
                  router.push('/login');
                }
                setIsOpen(false);
              }}>{`{Codog}`}</div>
          </LogoTitle>
          {isShowMenu && (
            <>
              <Menu>
                {isOpen ? (
                  <Image
                    src="/images/close.svg"
                    alt="close"
                    width="18"
                    height="18"
                    onClick={toggleMenu}
                  />
                ) : (
                  <Image
                    src="/images/menu.svg"
                    width="25"
                    height="18"
                    alt="menu"
                    onClick={toggleMenu}
                  />
                )}
              </Menu>
              <MenuList isOpen={isOpen}>
                <div
                  onClick={() => {
                    if (isLogin) {
                      router.push('/main');
                    } else {
                      router.push('/login');
                    }
                    setIsOpen(false);
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
                    window.open(
                      'https://codog.notion.site/Coding-with-dog-CODOG-559a37bc54c64cc295dafa4d3b27571e',
                      '_blank'
                    );
                  }}>
                  코독에 대하여...
                </div>
                {isLogin ? (
                  <div
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      localStorage.removeItem('refreshToken');
                      router.push('/login');
                    }}>
                    로그아웃
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      router.push('/login');
                    }}>
                    로그인
                  </div>
                )}
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
  z-index: 500;
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
  z-index: 500;
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
