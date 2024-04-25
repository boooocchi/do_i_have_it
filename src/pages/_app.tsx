import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalToasty from '@/components/elements/message/PortalToasty';
import Header from '@/components/layouts/menu/Header';
import SideMenu from '@/components/layouts/menu/SideMenu';
import { mainFont } from '@/constants/FontFamily';
import { ToastProvider } from '@/contexts/ToastContext';
import apolloClient from '@/lib/apollo';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <ToastProvider>
          <div
            className={`flex lg:max-w-[1470px] ${mainFont.className} text-base font-normal tracking-tight text-deepGreen bg-gray `}
          >
            {pathname === '/auth/signup' || pathname === '/auth/signin' ? (
              <Component {...pageProps} />
            ) : (
              <>
                <SideMenu />
                <div className="flex flex-col px-4xl py-2xl w-full  bg-gray h-screen gap-[45px] min-h-[750px] max-h-[800px]">
                  <Header />
                  <div className="flex-grow overflow-hidden">
                    <Component {...pageProps} />
                  </div>
                </div>
              </>
            )}
          </div>
          <PortalToasty></PortalToasty>
        </ToastProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
