import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { useCheckGithubIdMutation } from '@/hooks/query/useSignupMutation';
import { userState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const IntroStep1: NextPage<{ accessToken: string }> = ({ accessToken }) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const checkGithubIdMutation = useCheckGithubIdMutation();
  const [githubId, setGithubId] = useState(user.githubId);
  const [githubIdError, setGithubIdError] = useState('');

  //FIXME: 리팩토링 필요
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (!localStorage.getItem('accessToken')) {
      alert('비정상적인 접근 입니다!');
      router.push('/login');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGithubId(e.target.value);
    setGithubIdError('');
  };

  const handleSubmit = () => {
    checkGithubIdMutation.mutateAsync(githubId, {
      onSuccess: () => {
        setUser({ ...user, githubId });
        router.push('/intro/step2');
      },
      onError: (error: any) => {
        const message = error?.response.data.error.message || '';
        setGithubIdError(message);
      },
    });
  };

  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>Github 아이디를 입력해주세요.</ContentMessage>
      {githubIdError && <ErrorMessage>{githubIdError}</ErrorMessage>}
      <InputText
        type="text"
        name="githubId"
        onChange={handleChange}
        placeholder="codog_develop"
        value={githubId}
        className={githubIdError && 'error'}
      />
      <ButtonSubmit onClick={handleSubmit}>등록하기</ButtonSubmit>
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
  let response = '';
  try {
    if (code) {
      const res = await axios.get(
        `http://localhost:8080/users/sign-in/kakao/callback?code=${code}`
      );

      const { accessToken, refreshToken, isNewUser } = res.data.response;
      if (!isNewUser) {
        return [
          {
            destination: '/',
          },
        ];
      }
      response = accessToken;
    }
  } catch (e: any) {}
  return { props: { accessToken: response } };
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
  margin-top: 10px;
  padding: 16px 0;
  font-size: 16px;
  color: #ffffff;
  line-height: 19px;
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
