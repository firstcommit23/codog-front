import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { modalState } from '@/components/states';
import { getEmailAuthorization } from '@/apis/api';

const MailAhthorization: NextPage<{ accessToken: string; githubEmail: string; nickname: string }> =
  () => {
    const router = useRouter();
    const { email, token } = router.query;
    const [message, setMessage] = useState('이메일 인증 중... ');
    const [modal, setModal] = useRecoilState(modalState);

    useEffect(() => {
      if (!router.isReady) return;

      authoriza();
    }, [router.isReady]);

    const authoriza = async () => {
      const response = await getEmailAuthorization(String(email), String(token)).then((res) => res);

      if (response.status === 500) {
        setMessage('이메일 인증에 실패하였습니다 ㅠㅠ 다시 시도해주세요 🐶');
        return;
      }
      await setMessage('인증완료 🐶');
      await setModal({ ...modal, isShow: true, title: '인증완료되었습니다 🐶' });

      router.push('/intro/step2');
    };

    return (
      <DefaultLayout>
        <CoDogImage />
        <ContentMessage>{message}</ContentMessage>
      </DefaultLayout>
    );
  };

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

export default MailAhthorization;
