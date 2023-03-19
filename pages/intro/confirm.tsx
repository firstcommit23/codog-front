import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { useRecoilState } from 'recoil';
import { modalState, userState } from '@/components/states';
import { useMutation } from '@tanstack/react-query';
import { postSighupUser } from '@/apis/api';
import { User } from '@/apis/type';
import styled from '@emotion/styled';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';

const IntroConfirmPage = () => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const [, setModal] = useRecoilState(modalState);
  const { mutate, isLoading } = useMutation((user: User) => postSighupUser(user));
  
  const getRoomColor = (code:string) =>{
    const defaultValue = '#999999'
    switch (code){
      case 'A' :
        return '#82AAFF';
      case 'B' :
        return '#F07178';
      case 'C' :
        return '#F9C66A';
      default :
        return defaultValue;
    }
  }

  const handleSubmit = async () => {
    mutate(
      { nickname: user.nickname, character: user.character },
      {
        onSuccess: () => {
          setModal({
            isShow: true,
            title: '회원가입에 성공했습니다. 🐣',
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
    <DefaultLayout isShowMenu={false} height="110vh">
      <Canvas  paddingTop="4rem" roomColor={getRoomColor(user?.character)}>
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
    height:  0.8rem;
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
        height:  0.7rem;
        margin: 0.5rem;
      }
    }
`;
export default IntroConfirmPage;
