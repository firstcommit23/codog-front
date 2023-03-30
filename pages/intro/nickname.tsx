import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { postSighupUser } from '@/apis/api';
import { userState } from '@/components/states';
import { Canvas, DogCharacter } from '@/components/Canvas';
import useIntroRandomNicknameQuery from '@/hooks/query/useIntroRandomNicknameQuery';
import { User } from '@/apis/type';
import { getRoomColor } from '@/utils/serviceUtils';

const IntroNicknamePage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname || '');
  const [nicknameError, setNicknameError] = useState('');

  const { mutate, isLoading } = useMutation((user: User) => postSighupUser(user));

  const {
    data: randomNickname,
    refetch: refetchRandomNickname,
    isSuccess,
  } = useIntroRandomNicknameQuery({ enabled: !user.nickname });

  useEffect(() => {
    if (isSuccess && randomNickname) setNickname(randomNickname.nickname);
  }, [isSuccess, randomNickname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNickname(e.target.value);
    setNicknameError('');
  };

  const handleSubmit = async () => {
    mutate(
      { nickname: nickname, character: user.character },
      {
        onSuccess: () => {
          setUser({ ...user, nickname });
          router.push('/intro/confirm');
        },
        onError: (error: any) => {
          const message = error?.response.data.error.message || '';
          setNicknameError(message);
        },
      }
    );
  };

  const getRoomColor = (code: string) => {
    const defaultValue = '#999999';
    switch (code) {
      case 'A':
        return '#82AAFF';
      case 'B':
        return '#F07178';
      case 'C':
        return '#F9C66A';
      default:
        return defaultValue;
    }
  };

  return (
    <DefaultLayout isShowMenu={false} height="110vh">
      <Canvas paddingTop="4rem" roomColor={getRoomColor(user?.character)}>
        <DogCharacter character={user?.character} />
      </Canvas>
      <StepNavigation>
        <span></span>
        <span className="active"></span>
        <span></span>
      </StepNavigation>
      <ContentMessage>코독한 개발자 이름을 지어주세요.</ContentMessage>
      <InputText type="text" name="nickname" onChange={handleChange} value={nickname} />
      {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
      <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
        등록하기
      </ButtonSubmit>
      <ButtonSubmit color="#8D8D8D" onClick={() => refetchRandomNickname()}>
        랜덤으로 골라주세요
      </ButtonSubmit>
    </DefaultLayout>
  );
};

const ContentMessage = styled.div`
  padding-top: 2rem;
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
  width: 85%;
  height: 50px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #282828;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  color: red;
  font-size: 1.4rem;
`;

const ButtonSubmit = styled.button`
  width: 85%;
  background: ${(props) => `${props.color ? props.color : '#282828'}`};
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
  padding-top: 3rem;

  span {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: #d9d9d9;
    margin: 0.6rem;

    &.active {
      background: #444444;
    }
  }

  @media screen and (max-width: 375px) {
    padding-top: 2rem;

    span {
      width: 0.7rem;
      height: 0.7rem;
      margin: 0.5rem;
    }
  }
`;

export default IntroNicknamePage;
