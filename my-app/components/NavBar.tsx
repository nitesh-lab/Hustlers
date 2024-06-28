import Image from 'next/image';
import React from 'react';
import Input from './common/Input';

export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-800 fixed w-full z-[100] top-0 start-0 border-b border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={"/Images/logo.png"} width={48} height={48} alt='Logo' />
            <Input />
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <p className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0 dark:text-white" aria-current="page">Home</p>
              </li>
              <li>
                <p className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white">My Network</p>
              </li>
              <li>
                <p className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white">Jobs</p>
              </li>
              <li>
                <p className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white">Messaging</p>
              </li>
              <li>
                <p className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white">Notifications</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
