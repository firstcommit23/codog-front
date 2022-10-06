import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const LoginPage = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
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
        <KaKaoLoginButton onClick={() => router.push('/intro/step1')}>
          카카오로 3초만에 시작하기
        </KaKaoLoginButton>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const DogHouse = styled.div`
  position: relative;
  margin-top: 80px;
  width: 264px;
  height: 240px;
  align-self: center;
`;
const DogHouseRoofLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  height: 0px;
  border-top: 58px solid transparent;
  border-right: 132px solid #ffffff;
`;
const DogHouseRoofRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0px;
  height: 0px;
  border-top: 58px solid transparent;
  border-left: 132px solid #ffffff;
`;

const DogHouseRoom = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 58px;
  width: 264px;
  height: 182px;
  background: #ffffff;
  background: url('/images/codog_nobg.png') #ffffff;
  background-position: center bottom;
  background-repeat: no-repeat;
`;

const Ballon = styled.div`
  width: 134px;
  height: 27px;
  padding-top: 8px;
  position: relative;
  background: #ffffff;
  border: #000000 solid 1px;
  border-radius: 60px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;

  &:after {
    border-color: #ffffff transparent;
    border-style: solid;
    border-width: 17px 7px 0px 7px;
    content: '';
    position: absolute;
    top: 35px;
    left: 74px;
    z-index: 1;
  }
  &:before {
    border-color: #000000 transparent;
    border-style: solid;
    border-width: 19px 8px 0px 8px;
    content: '';
    position: absolute;
    top: 36px;
    left: 74px;
    z-index: 0;
  }
`;

const Catchphrase = styled.div`
  align-self: center;
  padding: 30px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
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

const KaKaoLoginButton = styled.button`
  align-self: center;
  width: 299px;
  height: 50px;
  background: #fee500;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #191600;
`;
export default LoginPage;
