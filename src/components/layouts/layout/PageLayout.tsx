import { useRouter } from 'next/router';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import { useAuth } from '@/hooks/useAuth';
import { Children } from '@/types/types';

import Header from '../menu/Header';
import SideMenu from '../menu/SideMenu';

const PageLayout: React.FC<Children> = ({ children }) => {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;
  const overFlow = pathname === '/' ? 'overflow-visible' : 'overflow-hidden';

  if (status === 'loading') {
    return (
      <div className="h-screen w-full">
        <Loading size="large" />
      </div>
    );
  }
  if (status !== 'authenticated') {
    router.push('/auth/signin');
  }

  return (
    <>
      {status === 'authenticated' && (
        <div className="w-full h-full flex">
          <SideMenu />
          <div className="flex flex-col h-full  px-sm py-md xs:px-4xl xs:py-2xl w-full bg-darkGray xs:gap-[40px] gap-[20px] xs:min-h-[750px] xs:max-h-[800px] xs:overflow-hidden">
            <Header />
            <div className={`xs:flex-grow h-[95%] ${overFlow}`}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageLayout;
