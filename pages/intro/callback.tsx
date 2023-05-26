import axios from 'axios';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback: NextPage<{
  accessToken: string;
  refreshToken: string;
  githubEmail: string;
  nickname: string;
  isNewUser: string;
}> = ({ accessToken, refreshToken, isNewUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 중 오류가 발생했습니다. 잠시후 다시 시도해주세요!');
      router.push('/login');
      return;
    } else {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    if (!isNewUser) {
      router.push('/');
    } else {
      router.push('/intro/character');
    }
  }, []);

  return <></>;
};

export async function getServerSideProps(context: any) {
  const { code } = context.query;
  const response = { accessToken: '', refreshToken: '', nickname: '', email: '', isNewUser: 0 };

  try {
    if (code) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CODOG_BACK_URL}/users/sign-in/github/callback?code=${code}`
      );
      console.log(res);
      const { accessToken, nickname, email, refreshToken, isNewUser } = res.data.response;

      response.accessToken = accessToken;
      response.refreshToken = refreshToken;
      response.nickname = nickname;
      response.email = email;
      response.isNewUser = isNewUser;
    }
  } catch (e: any) {
    console.log(e);
  }
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

export default Callback;
