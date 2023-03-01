import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';

const LoginPage = () => {
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=81e311c24df827ee5ef0&redirect_uri=http://localhost:3000/intro/callback`;
  };

  // accessToken이 있으면 메인으로 가기
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // if (token && token !== 'undefined') {
    //   Router.push('/');
    // }
  }, []);

  const ThinkList = [
    'Coding...',
    '오늘 머먹지',
    '앗! 금지',
    '200!',
    '404...',
    '나는 코딩왕이 될테야',
  ];
  const [random, setRandom] = useState(0);

  return (
    <DefaultLayout isShowMenu={false} backgroundColor="#282828">
      <Canvas>
        <DogCharacter
          character="A"
          onClick={() => setRandom(Math.floor(Math.random() * (ThinkList.length - 1 + 1)) + 0)}
        />
        <Balloon type="Think">{ThinkList[random]}</Balloon>
      </Canvas>
      <Catchphrase>
        <div>오늘도 코딩하는</div>
        <em>Codog한 개발자...</em>
      </Catchphrase>
      <GithubLoginButton onClick={handleGithubLogin}>
        <span>github으로 3초만에 시작하기</span>
      </GithubLoginButton>
    </DefaultLayout>
  );
};

const Catchphrase = styled.div`
  align-self: center;
  padding: 4rem 0;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3.5rem;
  color: #ffffff;
  white-space: nowrap;
  text-align: center;

  em {
    color: #99b9ff;
  }

  h1 {
    margin: 0;
    color: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:before {
      content: 'Codog한 개발자...';
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
`;
export default LoginPage;
