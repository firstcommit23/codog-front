import styled from "@emotion/styled";
import { Common } from "@/styles/common";
import DefaultLayout from '@/components/Layout/DefaultLayout';

const MyPage = () => {
    return(
        <DefaultLayout>
            <Wrapper>
                <Title>마이페이지</Title>
                <SubTitle>회원정보</SubTitle>
                <Profile>
                    <CoDogImage></CoDogImage>
                    <Info>
                        <Name>오늘도달린다개</Name>
                        <StartDate>
                            <span>시작</span>
                            <div>2022.11.00</div>
                        </StartDate>
                        <ModifyButton>프로필 수정하기</ModifyButton>
                    </Info>
                </Profile>
                <HorizontalLine></HorizontalLine>
                <SubTitle>소셜 계정 연동</SubTitle>
                <Account>
                    <div>
                        <GithubImage></GithubImage>
                        <Email>codog@gmail.com</Email>
                    </div>
                    <CancelButton>해지하기</CancelButton>
                </Account>
                <HorizontalLine></HorizontalLine>
                <SubTitle>알람 설정</SubTitle>
                <Alarm>
                    <SuccessAlarm>
                        <span>성공 알람</span>
                        <img src="/images/question-mark.svg"></img>
                    </SuccessAlarm>
                    <FailAlarm>
                        <span>실패 알람</span>
                        <img src="/images/question-mark.svg"></img>
                    </FailAlarm>
                </Alarm>
                <LogoutButton>로그아웃</LogoutButton>
                <Signout>
                    코독 회원탈퇴를 원하신다면 <button>여기</button>를 클릭하세요.
                </Signout>
            </Wrapper>
        </DefaultLayout>
    )
};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: ${Common.colors.white};
    color: ${Common.colors.black};
`;
const Title = styled.h2`
    font-size: 2.4rem;
    font-weight: 600;
    padding-bottom: 10px;
`;
const SubTitle = styled.h3`
    font-size: 2.0rem;
    font-weight: 500;
    margin: 30px 0;
`;
const Profile = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const CoDogImage = styled.div`
    background: url('/images/codog.png');
    width: 100px;
    height: 100px;
    background-size: contain;
`;

const Info = styled.div`
    margin-left: 30px;
`;

const Name = styled.div`
    font-size: 18px;
    font-weight: 600;
`;
const StartDate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: 15px 0;

    span{
        font-size: 14px;
        color: #a1a1a1;
        margin-right: 5px;
    }

    div{
        font-size: 16px;
        color: #585858;
    }
`;
const ModifyButton = styled.button`
    background-color: #EFEFEF;
    color: #505050;
    padding: 10px 15px;
    border: 0;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;

    &:hover{
        cursor: pointer;
        background-color: #E0E0E0;
    }
`;

const HorizontalLine = styled.div`
    width: 100%;
    border-bottom: 1px solid #d6d6d6;
    margin: 30px 0;
`;

const Account = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

const GithubImage = styled.div`
    background: url('/images/github-logo.svg');
    width: 24px;
    height: 24px;
    background-size: contain;
    margin-right: 15px;
`;

const Email = styled.div`
    font-size: 16px;
`;
const CancelButton = styled.button`
    background-color: white;
    border: 0;
    color: #585858;
    font-size: 16px;

    &:hover{
        cursor: pointer;
        color: #282828;
    }
`;

const Alarm = styled.div`

`;

const SuccessAlarm = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
    font-weight: normal;
    span{font-size: 18px;}
    img{margin-left: 8px;
        &:hover{
        cursor:pointer;
    }}
`;
const FailAlarm = styled.div`
    display: flex;
    flex-direction: row;
    font-weight: normal;
    span{font-size: 18px;}
    img{margin-left: 8px;
        &:hover{
        cursor:pointer;
    }}
`;

const LogoutButton = styled.button`
    padding: 15px 0;
    width: 100%;
    margin: 60px 0 20px 0;
    font-size: 18px;
    color: white;
    background-color:#282828;
    border: 0;
    border-radius: 5px;

    &:hover{
        cursor:pointer;
        background-color: #585858;
    }
`;

const Signout = styled.div`
    font-size: 14px;
    color: #a1a1a1;

    button{
        background-color: white;
        color: #a1a1a1;
        border: 0;
        text-decoration: underline;
        text-underline-offset: 2px;
        padding: 0 2px;

        &:hover{
            cursor: pointer;
            color: #585858;
        }
    }
`;

export default MyPage ;