import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import moment from 'moment';
import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import {
  Canvas,
  DogCharacter,
  Balloon,
  FoodItem,
  FurnitureItem,
  CheerButton,
} from '@/components/Canvas';
import Comments from '@/components/Comments';
import Calendars from '@/components/Calendars';
import Achievements from '@/components/Achievements';
import RoundButton from '@/components/Canvas/RoundButton';
import useUserShareQuery from '@/hooks/query/useUserShareQuery';
import axios from 'axios';

interface SharePageProps {
  githubId?: string;
}

const SharePage: NextPage = ({ githubId }: SharePageProps) => {
  const [value, onChange] = useState(new Date());
  const today = new Date();

  const { data: shareData, isSuccess } = useUserShareQuery(githubId);

  const getDday = (today: Date, createdDate: Date) => {
    const a = moment(today);
    const b = moment(createdDate);
    return a.diff(b, 'days');
  };

  if (!isSuccess) return null;

  return (
    <DefaultLayout>
      {/* 프로필 */}
      <ProfileContainer>
        {/* 닉네임, 공유 버튼 */}
        <ProfileBox>
          <ProfileWrapper>
            <ProfileContent>
              <span className="nickname">{shareData?.nickname}</span>님의 <br />
              코독하우스에 오신 것을 환영합니다!
            </ProfileContent>
            <ProfileButtonArea>
              <RoundButton route={`/mypage/itemshop`} iconUrl={`/images/home-edit.svg`} />
              <RoundButton iconUrl={`/images/Share_Android.svg`} />
            </ProfileButtonArea>
          </ProfileWrapper>
        </ProfileBox>
        {/* 코독 하우스 */}
        <Canvas>
          <DogCharacter character={shareData?.characterCode} />
          <Balloon type="Think" color="#3274FF" fontSize="1.4rem">
            열코딩중!!
          </Balloon>
          <FoodItem food={shareData.foodItem} />
          <FurnitureItem furniture={shareData.furnitureItem} />
          <DdayBox>
            <div className="pin"></div>
            <span className="Dday">D+{getDday(today, shareData?.createDate)}</span>
          </DdayBox>
          <CheerButton cheer={shareData.cheerCount} disabled={false} />
        </Canvas>
        {/* 개인 달성 지표 */}
        <Achievements footprintData={shareData.footPrintData} />
      </ProfileContainer>
      {/* 달력 */}
      <Calendars value={value} onChange={onChange} footprintData={shareData.footPrintData} />

      <HorizontalRule />
      <Comments title="코멘트 남기기 ✍️" footprintId={shareData.footPrintData?.footprintId} />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SharePageProps> = async (context) => {
  const { githubId } = context.params;

  if (!githubId || typeof githubId !== 'string' || Array.isArray(githubId)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  // github Id 유효성 체크
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_CODOG_BACK_URL}/users/share-house/${githubId}`)
    .then((res) => res.data.response)
    .catch(() => false);

  if (!response) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubId,
    },
  };
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 7rem;
  background-color: #282828;
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
  width: 120%;
  margin-left: -30px;
`;

export default SharePage;
