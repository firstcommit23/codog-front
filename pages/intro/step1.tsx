import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { modalState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { NextPage } from 'next';

const IntroStep1: NextPage<{
  accessToken: string;
  refreshToken: string;
  githubEmail: string;
  nickname: string;
  isNewUser: string;
}> = ({ accessToken, refreshToken, isNewUser }) => {
  const router = useRouter();
  const [, setModal] = useRecoilState(modalState);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [character, setCharacter] = useState('');

  const CharacterList = [
    { code: 'dog1', color: '#333333', image: '/', name: '멍멍1' },
    { code: 'dog2', color: '#333333', image: '/', name: '멍멍2' },
    { code: 'dog3', color: '#333333', image: '/', name: '멍멍3' },
    { code: 'dog4', color: '#333333', image: '/', name: '멍멍4' },
  ];

  useEffect(() => {
    // accessToken 우선하기
    // localstorage에 있는 경우

    console.log(accessToken);
    console.log(localStorage.getItem('accessToken'));

    if (!accessToken) {
      alert('비정상적인 접근 입니다!');
      // router.push('/login');
    } else {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    if (!isNewUser) {
      router.push('/');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCharacter(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    return null;
  };

  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>함께할 코독 개발자를 골라주세요!</ContentMessage>
      <StepNavigation>
        <span className="active"></span>
        <span></span>
        <span></span>
      </StepNavigation>
      {CharacterList.map((item: any) => {
        return (
          <>
            <input
              type="checkbox"
              value={item.code}
              onChange={handleChange}
              checked={item.code === character}
            />
            {item.name}
          </>
        );
      })}

      <ButtonSubmit onClick={handleSubmit} disabled={!character}>
        선택완료
      </ButtonSubmit>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: any) {
  const { code } = context.query;
  let response = { accessToken: '', refreshToken: '', nickname: '', email: '', isNewUser: 0 };

  try {
    if (code) {
      const res = await axios.get(
        `http://localhost:8080/users/sign-in/github/callback?code=${code}`
      );
      const { accessToken, nickname, email, refreshToken, isNewUser } = res.data.response;
      // if (!isNewUser) {
      //   return {
      //     redirect: {
      //       parmanent: false,
      //       destination: '/',
      //     },
      //   };
      // }

      response.accessToken = accessToken;
      response.refreshToken = refreshToken;
      response.nickname = nickname;
      response.email = email;
      response.isNewUser = isNewUser;
    }
  } catch (e: any) {}
  return {
    props: {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      githubEmail: response.email,
      nickname: response.nickname,
      isNewUser: response.isNewUser,
    },
  };
}

const CoDogImage = styled.div`
  background: url('/images/codog.png');
  width: 174px;
  height: 174px;
  background-size: contain;
`;

const ContentMessage = styled.div`
  padding-top: 44px;
  color: #323232;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.01em;
`;

const InputText = styled.input`
  margin-top: 20px;
  padding: 18px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  max-width: 300px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 300;
  line-height: 17px;

  &.error {
    border: 1px solid #e0b6b6;
    background: #fff6f6;
  }
`;

const ErrorMessage = styled.div`
  position: relative;
  width: 15rem;
  height: 2rem;
  padding-top: 0.8rem;
  background: #fff6f6;
  border: #e8c8c8 solid 1px;
  border-radius: 6rem;
  text-align: center;
  font-weight: 600;
  line-height: 2.1rem;

  &:after {
    position: absolute;
    top: 3.5rem;
    left: 7.4rem;
    content: '';
    border-color: #e8c8c8 transparent;
    border-style: solid;
    border-width: 17px 7px 0px 7px;
    z-index: 1;
  }
  &:before {
    position: absolute;
    top: 3.6rem;
    left: 7.4rem;
    content: '';
    border-color: #e8c8c8 transparent;
    border-style: solid;
    border-width: 19px 8px 0px 8px;
    z-index: 0;
  }
`;

const ButtonSubmit = styled.button`
  width: 100%;
  max-width: 300px;
  background: #282828;
  border-radius: 5px;
  border: 0;
  margin-top: 15px;
  padding: 16px 0;
  font-size: 18px;
  color: #ffffff;
  line-height: 19px;

  &:hover {
    background-color: #585858;
    cursor: pointer;
  }
  &:disabled {
    background-color: #eeeeee;
  }
`;

const StepNavigation = styled.div`
  display: flex;
  justify-content: cneter;
  padding-top: 54px;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d9d9d9;
    margin: 3px;

    &.active {
      background: #444444;
    }
  }
`;

export default IntroStep1;
