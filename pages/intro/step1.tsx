import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { modalState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { postAuthorizationMail } from '@/apis/api';

const IntroStep1: NextPage<{
  accessToken: string;
  refreshToken: string;
  githubEmail: string;
  nickname: string;
}> = ({ accessToken, refreshToken }) => {
  const router = useRouter();
  const [, setModal] = useRecoilState(modalState);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const { mutate, isLoading, isSuccess } = useMutation((email: string) =>
    postAuthorizationMail(email)
  );

  const buttonLabel = isSuccess ? '다시 인증하기' : isLoading ? '메일전송중' : '인증하기';

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    if (!localStorage.getItem('accessToken')) {
      alert('비정상적인 접근 입니다!');
      router.push('/login');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleSubmit = () => {
    mutate(email, {
      onSuccess: () => {
        setModal({
          isShow: true,
          title: '인증 메일 전송하였습니다.',
          content: '메일의 인증링크를 클릭 후 다음으로\n진행해주세요! 멍멍!',
        });
      },
      onError: (error: any) => {
        const { status, data } = error.response;
        if (status === 401) {
          alert('이메일 인증에 실패했습니다. 관리자에게 문의 바랍니다.');
          return;
        }
        const message = data.error?.message || '';
        setEmailError(message);
      },
    });
  };
  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>이메일을 입력해주세요.</ContentMessage>
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      <InputText
        type="text"
        name="githubId"
        onChange={handleChange}
        placeholder="codog_develop@codog.com"
        value={email}
        className={emailError && 'error'}
      />
      <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
        {buttonLabel}
      </ButtonSubmit>
      <StepNavigation>
        <span className="active"></span>
        <span></span>
        <span></span>
      </StepNavigation>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: any) {
  const { code } = context.query;
  let response = { accessToken: '', refreshToken: '', nickname: '', email: '', iseNewUser: 0 };
  try {
    if (code) {
      const res = await axios.get(
        `http://localhost:8080/users/sign-in/github/callback?code=${code}`
      );
      console.log(res);
      const { accessToken, nickname, email, refreshToken, isNewUser } = res.data.response;
      if (!isNewUser) {
        return {
          redirect: {
            parmanent: false,
            destination: '/',
          },
        };
      }

      response.accessToken = accessToken;
      response.refreshToken = refreshToken;
      response.nickname = nickname;
      response.email = email;
    }
  } catch (e: any) {}
  return {
    props: {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      githubEmail: response.email,
      nickname: response.nickname,
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
