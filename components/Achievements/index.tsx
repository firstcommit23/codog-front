import styled from '@emotion/styled';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import moment from 'moment';

interface IProps {
  value: Date;
}

const Achievements = ({ value }: IProps) => {
  const { data: footprintData } = useUserFootprintQuery(
    String(moment(value).year()),
    moment(value).format('MM')
  );

  return (
    <AchievementWrapper>
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
    </AchievementWrapper>
  );
};

const AchievementWrapper = styled.div`
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
  .item.total {
    background-color: #eaf1ff;
    color: #3274ff;
    .title {
      color: #3274ff;
    }
  }
  .item.month {
    background-color: #faf1ff;
    color: #c871ff;
    .title {
      color: #c871ff;
    }
  }
  .item.continuous {
    background-color: #ffeef0;
    color: #ff646c;
    .title {
      color: #ff646c;
      display: flex;
      align-items: center;
    }
    .title::after {
      content: '';
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

export default Achievements;
