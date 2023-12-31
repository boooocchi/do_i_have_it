import React from 'react';

import { Children } from '@/types/types';

import Header from '../menu/Header';

const MainLayout: React.FC<Children> = ({ children }) => {
  return (
    <div className="min-h-[750px] flex flex-col h-screen">
      <Header />
      <div className="flex-grow pt-xl pb-3xl px-4xl overflow-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
