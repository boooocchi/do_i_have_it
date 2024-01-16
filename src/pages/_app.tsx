import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import SideMenu from '@/components/layouts/menu/SideMenu';
import apolloClient from '@/lib/apollo';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <div className="flex justify-center bg-richGreen">
          <div className=" flex lg:w-[1470px] overflow-x-scroll">
            {pathname !== '/auth/signup' && pathname !== '/auth/signin' && <SideMenu />}
            <div className="flex-grow bg-white min-w-[980px]">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}
