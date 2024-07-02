"use client";
import Image from 'next/image';
import React from 'react';
import Input from './common/Input';
import Services from './Dashboard/Services';
import DropDown from './Dashboard/DropDown';
import { user_obj } from './auth/Signup';

export default function NavBarDashBoard<T extends user_obj>({user}:{user:T}) {
  return (
    <>
      <nav className="bg-white fixed w-full z-[100] top-0 start-0 border-b border-gray-300 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={"/Images/logo.png"} width={48} height={48} alt='Logo' />
            <Input />
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <ul className="font-medium flex flex-row space-x-3 rtl:space-x-reverse">
              <Services />
              <DropDown  name={user.name} email={user.email} image={user.profile_url}/>
              </ul>
          
          </div>
        </div>
      </nav>
    </>
  );
}
