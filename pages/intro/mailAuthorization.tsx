import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { getEmailAuthorization } from '@/apis/api';
import { useRecoilState } from 'recoil';
import { modalState } from '@/components/states';

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
      console.log(response);

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

export default MailAhthorization;
