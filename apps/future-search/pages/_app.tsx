import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import './styles.css';
import { SessionProvider } from 'next-auth/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to future-search!</title>
      </Head>
      <main className="app">
        <ApolloProvider client={client}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
