import styled from '@emotion/styled';
import Calendar from 'react-calendar';
import moment from 'moment';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Common } from '@/styles/common';
import type { FootprintType } from '@/apis/type';

interface IProps {
  value: Date;
  onChange?: React.Dispatch<React.SetStateAction<Date>>;
  footprintData: FootprintType;
}

const Calendars = ({ value, onChange, footprintData }: IProps) => {
  const onActiveStartDateChangeHandler = ({ activeStartDate }: any) => {
    onChange(activeStartDate);
  };

  const formatShortWeekday = (locale: any, date: any) =>
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];

  const CustomTooltips = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#303030',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#303030',
      color: 'white',
      padding: '1rem 1.2rem',
      fontSize: 15,
      bottom: '3rem',
    },
  }));

  return (
    <CalendarWrapper>
      <Calendar
        onChange={onChange}
        value={value}
        locale="ko"
        minDetail="month"
        maxDetail="month"
        formatDay={(locale, date) => moment(date).format('D')}
        formatShortWeekday={formatShortWeekday}
        showNeighboringMonth={false}
        onActiveStartDateChange={onActiveStartDateChangeHandler}
        tileContent={({ date, view }) => {
          if (footprintData?.month !== moment(date).format('MM')) return null;
          const day = moment(date).format('D');
          const content = Object.values(footprintData?.dayStamp || [])[parseInt(day) - 1];
          const html = [];
          const object = Object.entries(footprintData?.dayStamp || {});
          if (object.find((x) => x[0] === moment(date).format('D') && x[1] === 0)) {
            return null;
          }
          if (object.find((x) => x[0] === moment(date).format('D') && x[1] >= 1 && x[1] < 3)) {
            html.push(
              <FootPrintMarkLighten key={`footprint${date}-${view}`}></FootPrintMarkLighten>
            );
          }
          if (object.find((x) => x[0] === moment(date).format('D') && x[1] >= 3)) {
            html.push(<FootPrintMarkDarken key={`footprint${date}-${view}`}></FootPrintMarkDarken>);
          }
          return (
            <CustomTooltips title={content} arrow placement="top">
              <div key={`day${date}-${view}`}>{html}</div>
            </CustomTooltips>
          );
        }}
      />
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  padding: 3rem 2rem 4rem 2rem;

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
    margin: 0;
    padding: 1.8rem;
    font-size: 1.4rem;
    color: ${Common.colors.lightBlack};
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    rotate: -45deg;
    color: white;
    border-right: 1.5px solid #bfbfbf !important;
    border-bottom: 1.5px solid #bfbfbf !important;
    height: 15px;
    width: 15px;
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    rotate: 135deg;
    color: white;
    border-right: 1.5px solid #bfbfbf !important;
    border-bottom: 1.5px solid #bfbfbf !important;
    height: 15px;
    width: 15px;
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

  .react-calendar__month-view__days {
    background-color: rgba(0, 0, 0, 0);
  }
  .react-calendar__month-view__days abbr {
    font-size: 15px !important;
    position: relative;
    z-index: 2;
    color: black;
  }
  .react-calendar__tile--now {
    font-weight: 700 !important;
    font-size: 18px !important;
    background: url('/images/blue-circle.svg') no-repeat 50% 100%;
    background-size: 12%;
  }

  .react-calendar__tile.react-calendar__month-view__days__day {
    position: relative;
  }
`;

const FootPrintMarkDarken = styled.div`
  background: url('/images/paw-black.svg') no-repeat;
  background-size: contain;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 3%;
  right: 15%;
  transform: rotate(-5deg);

  @media screen and (max-width: 480px) {
    width: 3.5rem;
    height: 3.5rem;
    top: 8%;
    right: 10%;
  }
`;

const FootPrintMarkLighten = styled.div`
  background: url('/images/paw-grey.svg') no-repeat;
  background-size: contain;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 3%;
  right: 15%;
  transform: rotate(20deg);

  @media screen and (max-width: 480px) {
    width: 3.5rem;
    height: 3.5rem;
    top: 8%;
    right: 10%;
  }

  @media screen and (max-width: 375px) {
    right: 5%;
  }
`;
export default Calendars;
