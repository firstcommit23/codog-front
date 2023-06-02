import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';
import SyncLoader from 'react-spinners/ClipLoader';

const LoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem('accessToken');
      if (token && token !== 'undefined') {
        router.push('/main');
      } else {
        router.push('/login');
      }
    }, 1000);
  }, []);

  return (
    <DefaultLayout isShowMenu={false} backgroundColor="#282828" height="100vh">
      <CenterContainer>
        <Canvas>
          <DogCharacter character="A" left="5%" />
          <Balloon type="Think">Loading...</Balloon>
        </Canvas>
        <Catchphrase>
          <SyncLoader color="#82AAFF" />
        </Catchphrase>
      </CenterContainer>
    </DefaultLayout>
  );
};

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15%;
  min-height: 83vh;
  width: 294px;
`;

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

export default LoadingPage;
