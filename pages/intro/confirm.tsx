import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { useRecoilState } from 'recoil';
import { modalState, userState } from '@/components/states';
import { useMutation } from '@tanstack/react-query';
import { postSighupUser } from '@/apis/api';
import { User } from '@/apis/type';
import styled from '@emotion/styled';
import { Canvas, DogCharacter } from '@/components/Canvas';

const IntroConfirmPage = () => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const [, setModal] = useRecoilState(modalState);
  const { mutate, isLoading } = useMutation((user: User) => postSighupUser(user));

  const handleSubmit = async () => {
    mutate(
      { nickname: user.nickname, character: user.character },
      {
        onSuccess: () => {
          setModal({
            isShow: true,
            title: '회원가입 성공하였습니다 🐣',
            content: '함께 코독하게 코딩해봅시다!',
            onClick: () => router.push('/'),
          });
        },
        onError: (error: any) => {
          const message = error?.response.data.error.message || '';
          alert(message);
        },
      }
    );
  };
  return (
    <DefaultLayout isShowMenu={false}>
      <Canvas>
        <DogCharacter character="A" />
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
          <li>매일 저녁 9시에 체크돼요.</li>
        </ul>
      </ContentMessage>
      <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
        시작하기
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

  strong {
    font-weight: 700;
  }

  ul {
    padding: 11px;
    list-style-image: url('/images/listIcon.png');
  }
  li {
    padding: 5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #282828;
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

export default IntroConfirmPage;
