import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { useRecoilState } from 'recoil';
import { modalState, userState } from '@/components/states';
import styled from '@emotion/styled';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';
import { getRoomColor } from '@/utils/serviceUtils';
import LocalStorage from '@/utils/LocalStorage';

const IntroConfirmPage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [, setModal] = useRecoilState(modalState);

  useEffect(() => {
    const saveIntro = LocalStorage.get('saveIntro') || '';
    if (saveIntro && JSON.stringify(saveIntro) !== '{}') {
      setUser({ ...user, nickname: saveIntro.nickname, character: saveIntro.character });
    } else {
      router.push('/login');
    }
  }, []);

  const handleSubmit = async () => {
    LocalStorage.set('saveIntro', {});
    setModal({
      isShow: true,
      title: '환영합니다 🐣',
      content: '함께 코독하게 코딩해봅시다!',
      onClick: () => router.push('/main'),
    });
  };

  return (
    <DefaultLayout isShowMenu={false} height="110vh">
      <Canvas paddingTop="4rem" roomColor={getRoomColor(user?.character)}>
        <DogCharacter character={user?.character} />
        <Balloon fontSize="1.4rem" top="14rem" right="59%">
          맘에 들어요!
        </Balloon>
      </Canvas>
      <StepNavigation>
        <span></span>
        <span></span>
        <span className="active"></span>
      </StepNavigation>
      <ContentMessage>
        {user.nickname}님,
        <br />
        <strong>개발자국 찍기</strong>를 시작합니다!
        <ul>
          <li>Github에 커밋을 하면, 발자국이 찍혀요!</li>
          <li>발자국을 모으면 귀여운 아이템을 장착할 수 있어요.</li>
          <li>공유하기를 통해 친구에게 보여줄 수 있어요.</li>
        </ul>
      </ContentMessage>
      <ButtonSubmit onClick={handleSubmit}>홈으로 가기</ButtonSubmit>
    </DefaultLayout>
  );
};

const ContentMessage = styled.div`
  padding-top: 2rem;
  color: #323232;
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 3.5rem;
  letter-spacing: -0.01em;
  align-self: flex-start;
  margin-left: 45px;

  strong {
    font-weight: 700;
  }

  ul {
    padding: 1.1rem;
    list-style-image: url('/images/listIcon.svg');
  }
  li {
    padding: 0.5rem;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #282828;
  }
`;

const ButtonSubmit = styled.button`
  width: 85%;
  background: #282828;
  border-radius: 0.5rem;
  border: 0;
  margin-top: 1.5rem;
  padding: 1.6rem 0;
  font-size: 1.8rem;
  color: #ffffff;
  line-height: 1.9rem;

  &:hover {
    background-color: #585858;
    cursor: pointer;
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
export default IntroConfirmPage;
