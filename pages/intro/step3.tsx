import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const IntroStep3 = () => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>
        {user.nickname}님,
        <br />
        <strong>개발자국 찍기</strong>를 시작합니다!
        <ul>
          <li>Github에 커밋을 하면, 발자국이 찍혀요!</li>
          <li>등록하신 이메일로 오늘 하루 발자국을 보내드려요.</li>
          <li>매일 저녁 9시에 체크돼요.</li>
        </ul>
      </ContentMessage>
      <ButtonSubmit onClick={() => router.push('/')}>시작하기</ButtonSubmit>
      <StepNavigation>
        <span></span>
        <span></span>
        <span className="active"></span>
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
  background: #56a4ff;
  border-radius: 5px;
  border: solid 1px #56a4ff;
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

export default IntroStep3;
