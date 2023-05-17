import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import styled from '@emotion/styled';
import moment from 'moment';
// import useUserShareQuery from '@/hooks/query/useUserShareQuery';
import { getRoomColor } from '@/utils/serviceUtils';
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
import ShareButton from '@/components/ShareButton';

interface SharePageProps {
  githubId: string;
  shareData: any;
}

const SharePage: NextPage<SharePageProps> = ({ shareData, githubId: githubIdProps }) => {
  const [value, onChange] = useState(new Date());
  const [githubId, setGithubId] = useState(githubIdProps);

  useEffect(() => {
    setGithubId(githubIdProps);
  }, [githubIdProps]);

  const today = new Date();

  // const { data: shareData } = useUserShareQuery(githubId);

  const getDday = (today: Date, createdDate: Date) => {
    const a = moment(today);
    const b = moment(createdDate);
    return a.diff(b, 'days');
  };

  const foodItem = shareData.itemCodes?.filter((item: any) => item.includes('A')).join('') || '';
  const furnitureItem =
    shareData.itemCodes?.filter((item: any) => item.includes('B')).join('') || '';

  return (
    <>
      <Head>
        <title>{shareData?.nickname}님의 코독하우스</title>
        <meta property="og:title" content={`${shareData?.nickname}님의 코독하우스`} />
        <meta property="og:site_name" content="Codog" />
        <meta property="og:description" content="코독한 개발자의 발자국을 확인하세요!" />
        <meta property="og:image" content="/images/dosg/dog1.png" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CODOG_FRONT_URL}/share/${githubId}`}
        />
      </Head>
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
                <ShareButton nickname={shareData.nickname} githubId={githubId} />
              </ProfileButtonArea>
            </ProfileWrapper>
          </ProfileBox>
          {/* 코독 하우스 */}
          <Canvas roomColor={getRoomColor(shareData?.characterCode)}>
            <DogCharacter character={shareData?.characterCode} />
            <Balloon type="Think" color="#3274FF" fontSize="1.4rem">
              열코딩중!!
            </Balloon>
            <FoodItem food={foodItem} />
            <FurnitureItem furniture={furnitureItem} />
            <DdayBox>
              <div className="pin"></div>
              <span className="Dday">D+{getDday(today, shareData?.createdAt)}</span>
            </DdayBox>
            <CheerButton cheer={shareData.cheerCount} disabled={false} />
          </Canvas>
          {/* 개인 달성 지표 */}
          <Achievements footprintData={shareData.footPrintData} />
        </ProfileContainer>

        {/* 달력 */}
        <CalendarWrapper>
          <Calendars value={value} onChange={onChange} footprintData={shareData.footPrintData} />
        </CalendarWrapper>
        <HorizontalRule />
        <Comments
          title="코멘트 남기기 ✍️"
          footprintId={shareData.footPrintData?.footprintId}
          isOwner={shareData.isOwner}
        />
      </DefaultLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SharePageProps> = async (context) => {
  const { githubId } = context.params;

  if (!githubId || typeof githubId !== 'string' || Array.isArray(githubId)) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  try {
    // github Id 유효성 체크
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_CODOG_BACK_URL}/users/share-house/${githubId}`, {
        timeout: 3000,
      })
      .then((res) => res.data.response)
      .catch(() => false);

    if (!response) {
      return {
        redirect: {
          destination: '/error?statusCode=500&errorMessage=존재하지 않는 유저입니다',
          permanent: false,
        },
      };
    }

    return {
      props: {
        shareData: response,
        githubId: githubId,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/error?statusCode=500&errorMessage=API 통신 오류',
        permanent: false,
      },
    };
  }
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

const CalendarWrapper = styled.div`
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    display: none;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    display: none;
  }
  .react-calendar__navigation {
    justify-content: center !important;
  }
`;

export default SharePage;
