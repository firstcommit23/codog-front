import styled from '@emotion/styled';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const Home = () => {
  return (
    <DefaultLayout>
      <ProfileContainer>
        <ProfileBox>
          <CoDogImage />
          <ProfileWrapper>
            <ProfileContent>
              <span className="nickname">오늘도달린다개</span>님, <br />
              <strong>코독</strong>하게 <strong>코딩해봅시다.</strong>
            </ProfileContent>
            <ProfileButtonArea>
              <DdayBox>D+123</DdayBox>
              <ShareButton>공유하기</ShareButton>
            </ProfileButtonArea>
          </ProfileWrapper>
        </ProfileBox>
        <AchievementContainer>
          <div className="title">
            <div>총</div>
            <div>이번달</div>
            <div>연속</div>
          </div>
          <div className="content">
            <div className="total">20</div>
            <div>8</div>
            <div>12</div>
          </div>
        </AchievementContainer>
      </ProfileContainer>
      {/* 달력 */}
      <HorizontalRule />
      <div>
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
      </div>
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
  justify-content: center;
  align-items: center;
  column-gap: 30px;
`;

const CoDogImage = styled.div`
  background: url('/images/codog.png');
  width: 100px;
  height: 100px;
  background-size: contain;
`;

const ProfileWrapper = styled.div``;

const ProfileContent = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #323232;
  margin-bottom: 10px;

  .nickname {
    font-size: 18px;
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
  padding: 9px 10px 8px 11px;
`;

const ShareButton = styled.button`
  background-color: #282828;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  text-align: center;
  padding: 10px 20px;
  border: none;
`;

const AchievementContainer = styled.div`
  display: flex;
  margin: 4rem 0 2.5rem 0;
  row-gap: 18px;
  flex-direction: column;
  & > div {
    display: flex;
    justify-content: space-around;
  }
  .title {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #8c8c8c;
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
`;

const HorizontalRule = styled.hr`
  height: 5px;
  background: #f5f5f5;
  border: none;
  width: 100%;
`;
const MonthControl = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 35px;
`;

const MonthContent = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #282828;
`;
const CalendarArea = styled.div`
  & > div {
    display: flex;
    justify-content: space-evenly;
    padding: 8px;
  }
  span {
    width: 15px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #282828;
  }
`;

// login 전이면 인트로 이동
export default Home;
