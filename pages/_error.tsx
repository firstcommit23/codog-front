import DefaultLayout from '@/components/Layout/DefaultLayout';
import { NextPageContext } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const ErrorPage = ({ statusCode, errorMessage }: { statusCode: string; errorMessage: string }) => {
  const router = useRouter();

  return (
    <DefaultLayout isShowMenu={false} backgroundColor="#282828" height="100vh">
      <HeightCenter>
        <StatusCode>{statusCode}</StatusCode>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <ErrorImage></ErrorImage>
        <DefaultMessage>
          페이지가 존재하지 않거나, <br /> 사용할 수 없는 페이지입니다.
        </DefaultMessage>
        <HomeButton
          onClick={() => {
            router.push('/');
          }}>
          홈으로 가기
        </HomeButton>
      </HeightCenter>
    </DefaultLayout>
  );
};
ErrorPage.getInitialProps = (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorMessage = err ? err.message : 'Page Not Found';
  return { statusCode, errorMessage };
};
export default ErrorPage;

const HeightCenter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusCode = styled.div`
  color: #96b4ff;
  font-size: 4.5rem;
  font-family: 'Fira Code', monospace;
  padding-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: white;
  font-size: 2.2rem;
  padding-bottom: 3rem;
`;

const ErrorImage = styled.div`
  background-image: url('/images/error.svg');
  width: 21.5rem;
  height: 24rem;
  margin-left: -2rem;
`;

const DefaultMessage = styled.div`
  font-size: 1.6rem;
  color: white;
  text-align: center;
  line-height: 1.7;
  font-weight: 400;
  padding: 1rem 0 3rem 0;
`;

const HomeButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  background: white;
  color: #282828;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.2rem;
  width: 100%;
  padding: 1.4rem;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
    transition: all 0.3s ease;
  }
`;
