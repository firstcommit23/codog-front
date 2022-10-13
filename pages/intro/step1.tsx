import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { userState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const IntroStep1 = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DefaultLayout>
      <CoDogImage />
      <ContentMessage>Github 아이디를 입력해주세요.</ContentMessage>
      <InputText type="text" name="email" onChange={handleChange} placeholder="example@gmail.com" />
      <ButtonSubmit onClick={() => router.push('/intro/step2')}>등록하기</ButtonSubmit>
      <StepNavigation>
        <span className="active"></span>
        <span></span>
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
  font-size: 14px;
  font-weight: 300;
  line-height: 17px;
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

export default IntroStep1;
