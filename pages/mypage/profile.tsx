import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import moment from 'moment';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useIntroCharacterListQuery from '@/hooks/query/useIntroCharacterListQuery';
import { modalState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, FoodItem, FurnitureItem } from '@/components/Canvas';
import { postSighupUser } from '@/apis/api';
import type { CharacterType, User } from '@/apis/type';

const ProfilePage = () => {
  const {
    data: userData,
    isSuccess: isSuccessUserData,
    refetch: refetchUserData,
  } = useUserProfileQuery();
  const { data: characters } = useIntroCharacterListQuery();
  const { mutate, isLoading } = useMutation((user: User) => postSighupUser(user));

  const [profileUpdateData, setProfileUpdateData] = useState<User>({ nickname: '', character: '' });
  const [, setModal] = useRecoilState(modalState);

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
          setModal({
            isShow: true,
            title: '완료',
            content: '프로필 수정 완료하였습니다.',
          });
          refetchUserData();
        },
        onError: (error: any) => {
          const message = error?.response.data.error.message || '';
          alert(message);
        },
      }
    );
  };

  return (
    <DefaultLayout backgroundColor="white" height="100vh">
      {isSuccessUserData && (
        <>
          <Canvas>
            <DogCharacter character={userData?.characterCode} />
            <FoodItem food={userData.foodItem} />
            <FurnitureItem furniture={userData.furnitureItem} />
          </Canvas>
          <ProfileWrapper>
            <UserProfileTable>
              <div className="nickname">
              {profileUpdateData.nickname}
                {/* <input
                  type="text"
                  name="nickname"
                  value={profileUpdateData.nickname}
                  onChange={handleChange}
                /> */}
              </div>
              {/* <div>
                {characters?.map((item: CharacterType, index: number) => {
                  return (
                    <span key={item.code}>
                      <img src={item.image_url || ''} width="30px" height="30px" />
                      {item.name}
                      <input
                        type="radio"
                        id="character"
                        name="character"
                        value={item.code}
                        onChange={handleChange}
                        checked={item.code === profileUpdateData.character ? true : false}
                      />
                    </span>
                  );
                })}
              </div> */}
              {/* <div className="email">{userData.email}</div> */}
              <div className="email">junandkang@gmail.com</div>
            </UserProfileTable>
            <BtnWrapper>
              <NameUpdateButton color="#DCDCDC">이름 수정하기</NameUpdateButton>
              <HouseUpdateButton>코독 하우스 편집</HouseUpdateButton>
            </BtnWrapper>
          </ProfileWrapper>
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
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  padding: 4rem;

  .nickname{font-weight: 600;}
  .email{
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    margin-top: 1.5rem;
    color: #504f4f;
  }
  .email::before{
    content: "";
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
  color: #2E2E2E;

  &:hover {
    background-color: #BEBEBE;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &:disabled {
    background-color: #eeeeee;
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
  color: white;

  &:hover {
    background-color: #585858;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &:disabled {
    background-color: #eeeeee;
  }
`;

export default ProfilePage;
