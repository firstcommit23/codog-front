import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Common } from '@/styles/common';
import axios from 'axios';
import moment from 'moment';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import {
  Canvas,
  DogCharacter,
  Balloon,
  FoodItem,
  FurnitureItem,
  CheerButton,
} from '@/components/Canvas';
import { useRouter } from 'next/router';
import Comments from '@/components/Comments';
import Calendars from '@/components/Calendars';
import Achievements from '@/components/Achievements';
import RoundButton from '@/components/Canvas/RoundButton';
import ScrollToTopBtn from '@/components/ScrollButton/ScrollToTopBtn';
import ShareButton from '@/components/ShareButton';

const Home: NextPage = () => {
  const [value, onChange] = useState(new Date());
  const today = new Date();
  const router = useRouter();

  const { data: userData, isSuccess: isSuccessUserData } = useUserProfileQuery();
  const { data: footprintData, refetch } = useUserFootprintQuery(
    moment(value).format('YYYY'),
    moment(value).format('MM')
    // { enabled: isSuccessUserData }
  );

  useEffect(() => {
    isSuccessUserData && refetch();
  }, [isSuccessUserData, value]);

  const getDday = (today: Date, createdDate: Date) => {
    const a = moment(today);
    const b = moment(createdDate);
    return a.diff(b, 'days');
  };
  //isLoading
  if (!isSuccessUserData) return null;
  if (userData.isNewUser) router.push('/login');

  return (
    <DefaultLayout>
      {/* 프로필 */}
      <ProfileContainer>
        {/* 닉네임, 공유 버튼 */}
        <ProfileBox>
          <ProfileWrapper>
            <ProfileContent>
              <span className="nickname">{userData?.nickname}</span>님, <br />
              코독하게 코딩해봅시다.
            </ProfileContent>
            <ProfileButtonArea>
              <RoundButton route={`/mypage/itemshop`} iconUrl={`home-edit`} />
              <ShareButton nickname={userData.nickname} githubId={footprintData?.githubId} />
            </ProfileButtonArea>
          </ProfileWrapper>
        </ProfileBox>
        {/* 코독 하우스 */}
        <Canvas>
          <DogCharacter character={userData?.characterCode} />
          <Balloon type="Think" color="#3274FF" fontSize="1.4rem">
            밥머먹지
          </Balloon>
          <FoodItem food={userData.foodItem} />
          <FurnitureItem furniture={userData.furnitureItem} />
          <DdayBox>
            <div className="pin"></div>
            <span className="Dday">D+{getDday(today, userData?.createDate)}</span>
          </DdayBox>
          <CheerButton cheer={userData.cheerCount} disabled={false} />
        </Canvas>
        {/* 개인 달성 지표 */}
        <Achievements footprintData={footprintData} />
      </ProfileContainer>
      {/* 달력 */}
      <Calendars value={value} onChange={onChange} footprintData={footprintData} />

      <HorizontalRule />
      <Comments
        title="코멘트 보기 💬"
        isShowCommentInput={false}
        footprintId={footprintData?.footprintId}
        isOwner={true}
      />
      <ScrollToTopBtn />
    </DefaultLayout>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 7rem;
  background: linear-gradient(#282828 80%, #fff 10%);
`;
const ProfileBox = styled.div`
  width: 100%;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 0 2.5rem;
`;

const ProfileContent = styled.div`
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 3rem;
  color: #ffffff;

  .nickname {
    font-size: 2rem;
    font-weight: 600;
  }
  strong {
    font-weight: 600;
  }
`;
const ProfileButtonArea = styled.div`
  display: flex;
  column-gap: 10px;
`;

const DdayBox = styled.div`
  position: absolute;
  right: 3rem;
  top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .pin {
    background: url('/images/Dday_pin.svg') no-repeat;
    width: 1.4rem;
    height: 2.2rem;
  }
  .Dday {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efefef;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.8rem;
    color: #282828;
    padding: 0.8rem 1.5rem;
    max-width: 4rem;
    margin-top: -0.2rem;
  }
`;
const HorizontalRule = styled.hr`
  height: 8px;
  background: #f5f5f5;
  border: none;
  width: 100%;
`;

export default Home;
