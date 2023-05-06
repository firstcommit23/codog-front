import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { modalState } from '@/components/states';
import { deleteDropOutUser } from '@/apis/api';
import { useRouter } from 'next/router';

const DropOutPage = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(() => deleteDropOutUser());
  const [, setModal] = useRecoilState(modalState);
  const [agree, setAgree] = useState(false);

  const handleSuccess = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  const dropoutUser = () => {
    mutate(undefined, {
      onSuccess: () => {
        setModal({
          isShow: true,
          title: 'bye',
          content: '정상적으로 탈퇴되었습니다.',
          onClick: handleSuccess,
        });
      },
      onError: (error: any) => {
        const message = error?.response.data.error.message || '';
        alert(message);
      },
    });
  };

  const handleSubmit = () => {
    if (!agree) {
      setModal({
        isShow: true,
        title: '안내사항에 동의해주세요.',
        content: '',
      });
      return;
    }
    setModal({
      isShow: true,
      title: '탈퇴하시겠습니까?',
      content: '',
      isCancleButton: true,
      onClick: dropoutUser,
    });
  };

  return (
    <DefaultLayout backgroundColor="#ffffff" height="100vh">
      <Wrapper>
        <Title>코독 회원 탈퇴</Title>
        <DropoutDescriptionList>
          <li>
            회원 탈퇴 시 지금까지 쌓인 내역 삭제
            <div className="desc">
              발자국 누적 내역, 코독 하우스 아이템 등의 이용 내역들을 <br />
              다시 복구할 수 없습니다.
            </div>
          </li>
        </DropoutDescriptionList>
        <AgreementBoxArea>
          <input type="checkbox" id="agreement" checked={agree} onChange={() => setAgree(!agree)} />
          <label htmlFor="agreement">안내 사항을 확인하였으며, 이에 동의합니다.</label>
        </AgreementBoxArea>
        <HrLine />
        <OpinionArea>
          Codog 이용 중 불편한 점이 있으셨나요?
          <br /> 회원님의 소중한 의견으로 더 나은 서비스를 만들겠습니다.
          <br />
          <span>의견 남기기</span>
        </OpinionArea>
        <BtnWrapper>
          <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
            탈퇴하기
          </ButtonSubmit>
        </BtnWrapper>
      </Wrapper>
    </DefaultLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-top: 9rem;
  color: #282828;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  padding: 2rem 2.2rem;
`;

const DropoutDescriptionList = styled.ul`
  list-style: disc;
  padding: 1rem 0 1rem 4rem;
  line-height: 3rem;

  li {
    font-size: 1.8rem;
    font-weight: 600;

    .desc {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.6rem;
      margin-top: 0.5rem;
      color: #666666;
    }
  }
`;

const HrLine = styled.div`
  margin: 2.2rem;
  background: #d6d6d6;
  height: 0.1rem;
`;

const AgreementBoxArea = styled.div`
  padding: 2rem;

  input[type='checkbox'] {
    zoom: 1.5;
    vertical-align: middle;
    margin-top: 0rem;
  }

  label {
    box-sizing: border-box;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.5;
    margin-left: 1rem;
  }
`;

const OpinionArea = styled.div`
  padding: 2rem 2.2rem 4rem 2.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: #828282;

  span {
    display: inline-block;
    padding-top: 1rem;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
  }

  span:hover {
    color: #282828;
  }
`;

const BtnWrapper = styled.div`
  padding: 0 2rem;
`;

const ButtonSubmit = styled.button`
  width: 100%;
  background: #282828;
  border-radius: 5px;
  border: 0;
  padding: 2rem;
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
export default DropOutPage;
