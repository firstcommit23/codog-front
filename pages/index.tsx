import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Calendar from 'react-calendar';
import { Common } from '@/styles/common';
import Image from 'next/image';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [value, onChange] = useState(new Date());
  const [render, setRender] = useState(false);

  const formatShortWeekday = (locale: any, date: any) =>
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <DefaultLayout>
      <ProfileContainer>
        <ProfileBox>
          <CoDogImage />
          <ProfileWrapper>
            <ProfileContent>
              <span className="nickname">멍멍진도</span>님, <br />
              오늘도 코독하게 코딩해봅시다.
            </ProfileContent>
            <ProfileButtonArea>
              <DdayBox>D+123</DdayBox>
              <ShareButton>
                <span>공유하기</span>
                <Image src="/images/Share_Android.svg" width="18px" height="18px" alt="share" />
              </ShareButton>
            </ProfileButtonArea>
          </ProfileWrapper>
        </ProfileBox>
        <AchievementContainer>
          <div className="item">
            <div className="title">총</div>
            <div className="content">
              <div className="total">20</div>
            </div>
          </div>
          <div className="vertical"></div>
          <div className="item">
            <div className="title">이번달</div>
            <div className="content">10</div>
          </div>
          <div className="vertical"></div>
          <div className="item">
            <div className="title">연속</div>
            <div className="content">8</div>
          </div>
        </AchievementContainer>
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
          />
        )}
      </CalendarWrapper>
      {/* <div>
        <MonthControl>
          <div>&lt;</div>
          <MonthContent>2022.09</MonthContent>
          <div>&gt;</div>
        </MonthControl>
        <CalendarArea>
          <div>
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>
          <div>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span>31</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>

          <div>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
          <div>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
          </div>
          <div>
            <span>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
            <span>24</span>
          </div>
          <div>
            <span>25</span>
            <span>26</span>
            <span>27</span>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span>1</span>
          </div>
        </CalendarArea>
      </div> */}
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
  padding: 0 50px;
`;

const CoDogImage = styled.div`
  background: url('/images/codog.png');
  width: 120px;
  height: 120px;
  background-size: contain;
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

const AchievementContainer = styled.div`
  display: flex;
  margin: 4rem 0 2.5rem 0;
  row-gap: 18px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 3rem;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: #323232;

    .total {
      color: #1480ff;
    }
    div {
      width: 40px;
      text-align: center;
    }
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
  width: 100%;
`;

const CalendarWrapper = styled.div`
  padding: 4rem;

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

// const MonthControl = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   padding: 35px;
// `;

// const MonthContent = styled.div`
//   font-weight: 500;
//   font-size: 24px;
//   line-height: 29px;
//   color: #282828;
// `;
// const CalendarArea = styled.div`
//   & > div {
//     display: flex;
//     justify-content: space-evenly;
//     padding: 8px;
//   }
//   span {
//     width: 15px;
//     text-align: center;
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 17px;
//     color: #282828;
//   }
// `;

// login 전이면 인트로 이동
export default Home;
