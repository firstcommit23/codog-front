import React, { useState, useEffect } from 'react';
import { Common } from '@/styles/common';
import axios from 'axios';
import moment from 'moment';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';
import Image from 'next/image';
import { infoProps } from '@/public/types';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Achievement from '@/components/Main/Achievement';
import Modal from '@/components/Modal';
// import Popup from '@/components/Popup';

const Home = () => {
  const [value, onChange] = useState(new Date());
  const [render, setRender] = useState(false);
  const [datas, setDatas] = useState<infoProps>();
  const [open,setOpen] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  // const [logItems, setLogItems] = useState([] as any);
  // const [mark, setMark] = useState([]);

  const handleActiveStartDateChange = ({activeStartDate}:any) =>{
    setYear(`${activeStartDate.getFullYear()}`);
    setMonth(`${activeStartDate.getMonth()+1}`);
  }

  const formatShortWeekday = (locale: any, date: any) =>
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];

  useEffect(() => {

    const getData = async(year:string,month:string) => {
      const res = await axios.get(`http://localhost:8080/footprints?year=${year}&month=${month}`);
      setDatas(res.data.response);
  };
    getData(year,month);
    setRender(true);
  }, [month]);

  return (
    <DefaultLayout>
      <ProfileContainer>
        <ProfileBox>
          <CoDogImage />
          <ProfileWrapper>
            <ProfileContent>
              <span className="nickname">멍멍진도</span>님, <br/>
              오늘도 코독하게 코딩해봅시다.
            </ProfileContent>
            <ProfileButtonArea>
              <DdayBox>D+123</DdayBox>
              <ShareButton onClick={()=>setOpen(true)}>
                <span>공유하기</span>
                <Image src="/images/Share_Android.svg" width="18px" height="18px" alt="share" />
              </ShareButton>
            </ProfileButtonArea>
          </ProfileWrapper>
        </ProfileBox>
        <Achievement data={datas}/>
      </ProfileContainer>
      {/* 달력 */}
      <HorizontalRule />
      <CalendarWrapper>
        {render && (
          <Calendar
            onChange={onChange}
            value={value}
            formatDay={(locale, date) => moment(date).format('D')}
            formatShortWeekday={formatShortWeekday}
            onActiveStartDateChange={handleActiveStartDateChange}
          />
        )}
      </CalendarWrapper>
      <div>{year},{month}</div>
      {open? <Modal setOpen={setOpen}></Modal> : null}
    </DefaultLayout>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 30px;
`;

const CoDogImage = styled.div`
  background: url('/images/codog.png');
  width: 120px;
  height: 120px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ProfileWrapper = styled.div``;

const ProfileContent = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #323232;
  margin-bottom: 15px;

  .nickname {
    font-size: 22px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #efefef;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #282828;
  text-align: center;
  padding: 10px 15px;
`;

const ShareButton = styled.button`
  display: flex;
  flex-direction: row;
  background-color: #282828;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  text-align: center;
  padding: 10px 15px;
  border: none;
  gap: 5px;

  &:hover {
    cursor: pointer;
    background-color: #666666;
    transition: all 0.2s ease;
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
  padding: 4rem 0;

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
// login 전이면 인트로 이동
export default Home;
