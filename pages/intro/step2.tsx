import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { getRandomNickname, postSighupUser } from '@/apis/api';

const IntroStep2 = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const { mutate, isLoading } = useMutation((nickname: string) => postSighupUser(nickname));

  async function getNickname() {
    const response = await getRandomNickname();
    if (typeof response === 'string') setNickname(response);
  }

  useEffect(() => {
    getNickname();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNickname(e.target.value);
    setNicknameError('');
  };

  const handleSubmit = async () => {
    mutate(nickname, {
      onSuccess: () => {
        router.push('/intro/step3');
      },
      onError: (error: any) => {
        const message = error?.response.data.error.message || '';
        setNicknameError(message);
      },
    });
  };

  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>코독한 개발자 이름을 지어주세요.</ContentMessage>
      {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
      <InputText type="text" name="nickname" onChange={handleChange} value={nickname} />
      <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
        등록하기
      </ButtonSubmit>
      <ButtonSubmit onClick={getNickname}>다른 닉네임!</ButtonSubmit>
      <StepNavigation>
        <span></span>
        <span className="active"></span>
        <span></span>
      </StepNavigation>
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
  font-size: 16px;
  font-weight: 300;
  line-height: 19px;
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

export default IntroStep2;
