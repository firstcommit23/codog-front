import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Common } from '@/styles/common';
import axios from 'axios';
import moment from 'moment';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import { Canvas, DogCharacter, Balloon, FoodItem, FurnitureItem } from '@/components/Canvas';

const Home: NextPage = () => {
  const [value, onChange] = useState(new Date());
  const today = new Date();

  const { data: userData, isSuccess: isSuccessUserData } = useUserProfileQuery();
  const { data: footprintData } = useUserFootprintQuery(
    String(moment(value).year()),
    String(moment(value).month())
  );

  const onActiveStartDateChangeHandler = ({activeStartDate}:any) => {
    onChange(activeStartDate);
  };
  console.log(footprintData);
  // console.log('userData',userData);

  const formatShortWeekday = (locale: any, date: any) =>
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];

  const getDday  = (today:Date, createdDate:Date) => {
    const a = moment(today);
    const b = moment(createdDate);
    return a.diff(b,'days');
  }

  if (!isSuccessUserData) return null;

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
              <ShareButton>
                <ShareIcon></ShareIcon>
              </ShareButton>
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
            <span className="Dday">D+{getDday(today,userData?.createDate)}</span>
          </DdayBox>
        </Canvas>
        {/* 개인 달성 지표 */}
            <AchievementContainer>
              <div className="item total">
                <div className="title">총</div>
                <div className="content">{footprintData?.totalCount}</div>
              </div>
              <div className="item month">
                <div className="title">이번달</div>
                <div className="content">{footprintData?.thisMonthTotalCount}</div>
              </div>
              <div className="item continuous">
                <div className="title">연속</div>
                <div className="content">{footprintData?.continuousCount}</div>
              </div>
            </AchievementContainer>
      </ProfileContainer>

      {/* 달력 */}
      <CalendarWrapper>
          <Calendar
            onChange={onChange}
            value={value}
            minDetail="month"
            maxDetail="month"
            formatDay={(locale, date) => moment(date).format('D')}
            formatShortWeekday={formatShortWeekday}
            showNeighboringMonth ={false}
            onActiveStartDateChange={onActiveStartDateChangeHandler}
            tileContent={({date,view})=>{
              if(Object.entries(footprintData?.dayStamp || {}).find((x)=>x[0] === moment(date).format("D") && (x[1]>3))){
                const day = moment(date).format('D');
                const content = Object.values(footprintData?.dayStamp || [])[parseInt(day)-1];
                return(
                  <Popup>{content}개</Popup>
                );
              }
              return(
                <FootPrintMark></FootPrintMark>
              );
            }}
          />
      </CalendarWrapper>
    </DefaultLayout>
  );
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
    flex-direction:column;
    justify-content: center;
    align-items: center;

  .pin{
    background: url('/images/Dday_pin.svg') no-repeat;
    width: 1.4rem;
    height: 2.2rem;
  }
  .Dday{
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

const ShareButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #585858;
  border-radius: 5rem;
  font-weight: 500;
  font-size: 1.5rem;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #666666;
    transition: all 0.2s ease;
  }
`;

const ShareIcon = styled.div`
  background: url('/images/Share_Android.svg') no-repeat;
  width: 2.5rem;
  height: 2rem;
`;

const AchievementContainer = styled.div`
  display: flex;
  padding: 3rem 2rem 3rem 2rem;
  gap: 2rem;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10rem;
    border-radius: 1rem;
  }
  .item.total{
    background-color: #EAF1FF;
    color: #3274FF;
    .title{
      color: #3274FF;
    }
  }
  .item.month{
    background-color: #FAF1FF;
    color: #C871FF;
    .title{
      color: #C871FF;
    }
  }
  .item.continuous{
    background-color: #FFEEF0;
    color: #FF646C;
    .title{
      color: #FF646C;
      display:flex;
      align-items: center;
    }
    .title::after{
      content: "";
      background: url('/images/fire.png');
      background-size: cover;
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0.2rem;
    }
  }
  .title {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #8c8c8c;
    margin-bottom: 1.5rem;
    div {
      width: 40px;
      text-align: center;
    }
  }
  .content {
    font-family: 'Fira Code', monospace;
    font-weight: 600;
    font-size: 32px;
    line-height: 30px;
  }

  .vertical {
    height: 4rem;
    border-right: 1px solid #d4d4d4;
  }
`;

const HorizontalRule = styled.hr`
  height: 5px;
  background: #f5f5f5;
  border: none;
  width: 120%;
  margin-left: -30px;
`;

const CalendarWrapper = styled.div`
  padding: 3rem 2rem;

  .react-calendar button {
    background-color: white;
    border: none;
  }
  .react-calendar abbr[title] {
    text-decoration: none;
  }
  .react-calendar__navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    padding: 0 25px;
  }

  .react-calendar__navigation__label {
    font-size: 2.2rem;
    font-weight: 500;
    font-family: 'Pretendar Variable', Pretendard !important;
    color: ${Common.colors.black};
    flex-grow: 0 !important;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${Common.colors.black};
  }

  .react-calendar__tile.react-calendar__month-view__days__day {
    padding: 1.5rem;
    font-size: 1.4rem;
    color: ${Common.colors.lightBlack};
  }

  .react-calendar__navigation__arrow {
    color: white;
    border-right: 1.5px solid #bfbfbf !important;
    border-bottom: 1.5px solid #bfbfbf !important;
    height: 15px;
    width: 15px;
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    rotate: -45deg;
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    rotate: 135deg;
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button {
    display: none;
  }

  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth {
    color: #c0bebe;
  }

  .react-calendar__month-view__days abbr {
    font-size: 15px !important;
  }
  .react-calendar__tile--now {
    font-weight: 700 !important;
    font-size: 18px !important;
    background: url('/images/blue-circle.svg') no-repeat 50% 100%;
    background-size: 12%;
  }
`;

const Popup = styled.div``;
const FootPrintMark = styled.div``;
export default Home;
