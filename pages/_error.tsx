import DefaultLayout from '@/components/Layout/DefaultLayout';
import { NextPageContext } from 'next';

const errorPage = ({ statusCode }: { statusCode: string }) => {
  return (
    <DefaultLayout isShowMenu={false} backgroundColor="#282828">
      <div style={{ color: '#ffffff', fontSize: '4rem', margin: 'auto 0' }}>{statusCode}</div>
    </DefaultLayout>
  );
};
errorPage.getInitialProps = (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default errorPage;
