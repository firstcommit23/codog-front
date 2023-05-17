import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import moment from 'moment';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useIntroCharacterListQuery from '@/hooks/query/useIntroCharacterListQuery';
import { getRoomColor } from '@/utils/serviceUtils';
import { modalState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, FoodItem, FurnitureItem } from '@/components/Canvas';
import { postSighupUser } from '@/apis/api';
import type { CharacterType, User } from '@/apis/type';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const {
    data: userData,
    isSuccess: isSuccessUserData,
    refetch: refetchUserData,
  } = useUserProfileQuery();
  const { data: characters, isSuccess } = useIntroCharacterListQuery();
  const { mutate, isLoading } = useMutation((user: User) => postSighupUser(user));

  const [profileUpdateData, setProfileUpdateData] = useState<User>({ nickname: '', character: '' });
  const [updateModal, setUpdateModal] = useState(false);
  const [, setModal] = useRecoilState(modalState);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (isSuccessUserData) {
      setProfileUpdateData({
        nickname: userData.nickname || '',
        character: userData.characterCode || 'A',
      });
    }
  }, [isSuccessUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileUpdateData({
      ...profileUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    mutate(
      { nickname: profileUpdateData.nickname, character: profileUpdateData.character },
      {
        onSuccess: () => {
          setUpdateModal(false);
          refetchUserData();
        },
        onError: (error: any) => {
          const message = error?.response.data.error.message || '';
          setError(message);
        },
      }
    );
  };

  return (
    <DefaultLayout backgroundColor="white" height="100vh">
      {isSuccessUserData && (
        <>
          <Canvas paddingTop="5rem" roomColor={getRoomColor(userData?.characterCode)}>
            <DogCharacter character={userData?.characterCode} />
            <FoodItem food={userData.foodItem} />
            <FurnitureItem furniture={userData.furnitureItem} />
          </Canvas>
          <ProfileWrapper>
            <UserProfileTable>
              <div className="nickname">{userData?.nickname}</div>
              <div className="githubId">{userData?.github_id}</div>
              {/* <div className="email">junandkang@gmail.com</div> */}
            </UserProfileTable>
            <BtnWrapper>
              <NameUpdateButton
                onClick={() => {
                  setUpdateModal(true);
                }}
                color="#DCDCDC">
                <span>이름 수정하기</span>
              </NameUpdateButton>
              <HouseUpdateButton
                onClick={() => {
                  router.push('/mypage/itemshop');
                }}
                color="#DCDCDC">
                <span>코독하우스 편집</span>
              </HouseUpdateButton>
            </BtnWrapper>
            <BtnWrapper>
              <LogOutButton
                onClick={() => {
                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');
                  router.push('/login');
                }}>
                로그아웃 하기
              </LogOutButton>
            </BtnWrapper>
            <UserDropOut>
              코독 회원 탈퇴를 원하신다면
              <span onClick={() => router.push('/mypage/dropout')} className="link">
                여기
              </span>
              를 클릭하세요.
            </UserDropOut>
          </ProfileWrapper>

          {/* 업데이트 모달*/}
          {updateModal && (
            <UpdateModal>
              <Container>
                <div className="title">코독 이름</div>
                <input
                  type="text"
                  name="nickname"
                  value={profileUpdateData.nickname}
                  onChange={handleChange}
                />
                <ErrorMessage>{error}</ErrorMessage>
                <ModalBtnWrapper>
                  <CancelButton
                    onClick={() => {
                      setUpdateModal(false);
                    }}>
                    취소
                  </CancelButton>
                  <ConfirmButton onClick={handleSubmit}>수정</ConfirmButton>
                </ModalBtnWrapper>
              </Container>
            </UpdateModal>
          )}
        </>
      )}
    </DefaultLayout>
  );
};
const ProfileWrapper = styled.div`
  min-height: 60vh;
  width: 100%;
`;

const UserProfileTable = styled.div`
  font-size: 2.2rem;
  font-weight: 400;
  text-align: center;
  padding: 4rem;

  .nickname {
    font-weight: 600;
  }
  .githubId {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    margin-top: 1.5rem;
    color: #504f4f;
  }
  .githubId::before {
    content: '';
    background: url('/images/github-logo.svg');
    background-size: cover;
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 0 2rem;
`;

const NameUpdateButton = styled.button`
  width: 100%;
  max-width: 30rem;
  background: ${(props) => `${props.color ? props.color : '#282828'}`};
  border-radius: 0.5rem;
  border: 0;
  padding: 1.6rem 0;
  font-size: 1.6rem;
  color: #2e2e2e;

  &:hover {
    background-color: #bebebe;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &:disabled {
    background-color: #eeeeee;
  }

  span::before {
    content: '';
    background: url('/images/pencil.svg') no-repeat;
    background-size: cover;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: -0.3rem;
    margin-right: 0.8rem;
  }
`;
const HouseUpdateButton = styled.button`
  width: 100%;
  max-width: 30rem;
  background: ${(props) => `${props.color ? props.color : '#282828'}`};
  border-radius: 0.5rem;
  border: 0;
  padding: 1.6rem 0;
  font-size: 1.6rem;
  color: #2e2e2e;

  &:hover {
    background-color: #bebebe;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &:disabled {
    background-color: #eeeeee;
  }

  span::before {
    content: '';
    background: url('/images/home.svg') no-repeat;
    background-size: cover;
    display: inline-block;
    width: 2rem;
    height: 1.5rem;
    margin-bottom: -0.1rem;
    margin-right: 0.5rem;
  }
`;

const UpdateModal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 13rem;
  position: relative;

  .title {
    font-size: 1.5rem;
    color: #7c7c7c;
    font-weight: light;
    margin-bottom: 1.5rem;
  }

  input {
    border: 1px solid #cdcdcd;
    border-radius: 0.5rem;
    padding: 1.2rem 2rem;
    font-size: 1.6rem;
  }

  input:focus {
    outline: none;
  }
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 3.5rem;
`;

const CancelButton = styled.button`
  font-size: 1.6rem;
  color: #282828;
  background-color: #dcdcdc;
  border: 0;
  border-bottom-left-radius: 0.5rem;
  width: 50%;
  padding: 1.2rem;
  position: absolute;
  bottom: 0;
  left: 0;

  &:hover {
    cursor: pointer;
  }
`;

const ConfirmButton = styled.button`
  font-size: 1.6rem;
  color: white;
  background-color: #282828;
  border: 0;
  border-bottom-right-radius: 0.5rem;
  width: 50%;
  padding: 1.2rem;
  position: absolute;
  bottom: 0;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.span`
  font-size: 1.4rem;
  color: #ff3e13;
  margin-top: 1rem;
`;

const LogOutButton = styled.button`
  width: 100%;
  font-size: 1.8rem;
  color: white;
  background-color: #282828;
  border: 0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #666666;
    transition: all 0.2s ease;
  }
`;

const UserDropOut = styled.div`
  font-size: 1.4rem;
  color: #a1a1a1;
  margin: 2rem;

  span {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    margin: 0 0.4rem;
  }

  span:hover {
    color: #666666;
  }
`;

export default ProfilePage;
