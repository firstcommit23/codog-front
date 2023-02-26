import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { getRandomNickname } from '@/apis/api';
import { useRecoilState } from 'recoil';
import { userState } from '@/components/states';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';

const IntroNicknamePage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname || '');
  const [nicknameError, setNicknameError] = useState('');

  async function getNickname() {
    const response = await getRandomNickname();
    if (typeof response === 'string') setNickname(response);
  }

  useEffect(() => {
    if (!user.nickname) {
      getNickname();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNickname(e.target.value);
    setNicknameError('');
  };

  const handleSubmit = async () => {
    if (!nickname) {
      setNicknameError('닉네임을 지어주세용');
    }
    setUser({ ...user, nickname });
    router.push('/intro/confirm');
  };

  return (
    <DefaultLayout isShowMenu={false}>
      <Canvas>
        <DogCharacter character="A" />
        <Balloon color="#3274FF" fontSize="1.4rem">
          맘에 들어요!
        </Balloon>
      </Canvas>
      <StepNavigation>
        <span></span>
        <span className="active"></span>
        <span></span>
      </StepNavigation>
      <ContentMessage>코독한 개발자 이름을 지어주세요.</ContentMessage>
      {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
      <InputText type="text" name="nickname" onChange={handleChange} value={nickname} />
      <ButtonSubmit onClick={handleSubmit}>등록하기</ButtonSubmit>
      <ButtonSubmit color="#8D8D8D" onClick={getNickname}>
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
  padding-top: 2rem;

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

export default IntroNicknamePage;
