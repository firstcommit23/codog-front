import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { userState } from '@/components/states';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const IntroStep2 = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user);
  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>코독한 개발자 이름을 지어주세요.</ContentMessage>
      <InputText type="text" name="nickname" onChange={handleChange} placeholder="오늘도달린다개" />
      <ButtonSubmit onClick={() => router.push('/intro/step3')}>등록하기</ButtonSubmit>
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

  &:hover{
    background-color: #585858;
    cursor:pointer;
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
