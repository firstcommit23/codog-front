import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { GlobalStyles } from '@/styles/global-styles';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 300000,
        retry: 3,
      },
      mutations: {
        onError: (err, variables, recover) => {
          console.log('An error occurred:', err);
          // recover();
        },
      },
    },
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Codog</title>
      </Head>
      {GlobalStyles}
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  );
};

export default App;
