import React from 'react';

import { subFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

const PageTitle: React.FC<Children> = ({ children }) => {
  return (
    <h1
      className={`text-2xl text-pageTitle ${subFont.className} tracking-normal uppercase text-deepGreen pb-sm px-sm leading-[100%]`}
    >
      {children}
    </h1>
  );
};

export default PageTitle;