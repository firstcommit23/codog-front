import styled from '@emotion/styled';
import Header from '@/components/Header';
import { Common } from '@/styles/common';

const LoginPage = () => {
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=81e311c24df827ee5ef0&redirect_uri=http://localhost:3000/intro/step1`;
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <DogHouse>
          <DogHouseRoofLeft />
          <DogHouseRoofRight />
          <DogHouseRoom>
            <Ballon>Coding ...</Ballon>
          </DogHouseRoom>
        </DogHouse>
        <Catchphrase>
          <h1>오늘도 코딩하는</h1>
        </Catchphrase>
        <GithubLoginButton onClick={handleGithubLogin}>
          <div></div>
          <span>github으로 3초만에 시작하기</span>
        </GithubLoginButton>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: ${Common.colors.black};
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const DogHouse = styled.div`
  position: relative;
  align-self: center;
  margin-top: 80px;
  width: 26.4rem;
  height: 24rem;
`;
const DogHouseRoofLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  height: 0px;
  border-top: 5.8rem solid transparent;
  border-right: 13.2rem solid #ffffff;
`;
const DogHouseRoofRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0px;
  height: 0px;
  border-top: 5.8rem solid transparent;
  border-left: 13.2rem solid #ffffff;
`;
const DogHouseRoom = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 5.8rem;
  width: 26.4rem;
  height: 18.2rem;
  background: #ffffff;
  background: url('/images/codog_nobg.png') #ffffff;
  background-position: center bottom;
  background-repeat: no-repeat;
`;
const Ballon = styled.div`
  position: relative;
  width: 13.4rem;
  height: 2.7rem;
  padding-top: 0.8rem;
  background: #ffffff;
  border: #000000 solid 1px;
  border-radius: 6rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.1rem;

  &:after {
    position: absolute;
    top: 3.5rem;
    left: 7.4rem;
    content: '';
    border-color: #ffffff transparent;
    border-style: solid;
    border-width: 17px 7px 0px 7px;
    z-index: 1;
  }
  &:before {
    position: absolute;
    top: 3.6rem;
    left: 7.4rem;
    content: '';
    border-color: #000000 transparent;
    border-style: solid;
    border-width: 19px 8px 0px 8px;
    z-index: 0;
  }
`;
const Catchphrase = styled.div`
  align-self: center;
  padding: 3rem 0;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
  color: #ffffff;
  white-space: nowrap;
  h1 {
    margin: 0;
    color: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:before {
      content: '오늘도 코딩하는';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #ffffff;
      overflow: hidden;
      border-right: 1px solid black;
      animation: typing 3s steps(31) infinite;
    }
    @keyframes typing {
      0% {
        width: 0%;
      }
      50% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }
  }
`;
const GithubLoginButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 29.9rem;
  height: 5rem;
  background: white;
  color: #282828;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: #191600;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }

  div {
    background-image: url('/images/github-logo.svg');
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 10px;
  }
`;
export default LoginPage;
