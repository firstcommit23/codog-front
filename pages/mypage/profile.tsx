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
  const [, setModal] = useRecoilState(modalState);
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
          setModal({
            isShow: true,
            title: '완료',
            content: '프로필 수정 완료하였습니다.',
            onClick: () => refetchUserData(),
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
    <DefaultLayout backgroundColor="#282828" height="none">
      {isSuccessUserData && (
        <>
          <Canvas>
            <DogCharacter character={userData?.characterCode} />
            <FoodItem food={userData.foodItem} />
            <FurnitureItem furniture={userData.furnitureItem} />
          </Canvas>
          <ProfileWrapper>
            <UserProfileTable>
              <div>닉네임</div>
              <div>
                <input
                  type="text"
                  name="nickname"
                  value={profileUpdateData.nickname}
                  onChange={handleChange}
                />
              </div>
              <div>캐릭터</div>
              <div>
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
              </div>
              <div>이메일</div>
              <div>{userData.email}</div>
              <div>가입일자</div>
              <div>{moment(userData.createDate).format('YYYY/MM/DD HH:mm:ss')}</div>
              <button onClick={handleSubmit}>수정하기</button>

              <div>
                코독 회원 탈퇴를 원하신다면
                <UserDropOutLink onClick={() => router.push('/mypage/dropout')}>
                  여기
                </UserDropOutLink>
                를 클릭하세요.
              </div>
            </UserProfileTable>
          </ProfileWrapper>
        </>
      )}
    </DefaultLayout>
  );
};
const ProfileWrapper = styled.div`
  min-height: 60vh;
`;

const UserProfileTable = styled.div`
  color: #fff;
  font-size: 2rem;
`;

const UserDropOutLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

export default ProfilePage;
