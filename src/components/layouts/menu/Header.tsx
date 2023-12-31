import { useSession } from 'next-auth/react';
import React from 'react';

import { subFont } from '@/constants/FontFamily';

import HeaderDropdownMenu from './HeaderDropdownMenu';

const Header = () => {
  const { data } = useSession();
  const userName = data?.user?.userName;

  return (
    <header>
      <nav className="w-full h-pc_header bg-transparent pt-xl pb-[26px] px-4xl flex justify-between items-center">
        <div className="relative">
          <input type="text" className=" border border-richGreen w-48 h-7 mr-sm p-xs pr-lg text-xs rounded-md" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00110F"
            className="w-4 h-4 absolute right-4 top-[5px]"
          >
            <path
              strokeLinecap="square"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <div className={`${subFont.className} flex text-lg gap-2`}>
          <p>Hello, {userName}</p>
          <HeaderDropdownMenu></HeaderDropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
