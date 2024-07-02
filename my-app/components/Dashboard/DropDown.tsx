"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { MdLogout, MdOutlineNotifications } from 'react-icons/md';
import { FaComments, FaNetworkWired } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../lib/reduxhooks';
import { active_action } from '../../lib/Slices/DashBoardSlice';
import Image from 'next/image';

export default function DropDown({image,name,email}:{image:string,name:string,email:string}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = useAppSelector((state) => state.dashboard.active);
  const dispatch = useAppDispatch();

  function handleNavClick(navItem:"home" | "network" | "messaging" | "jobs") {
    dispatch(active_action(navItem));
    setDropdownOpen(false); // Close dropdown after clicking an item
  }

  return (
    <li className="relative">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
        <span className="sr-only">Open user menu</span>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <Image src={image} alt='null' width={48} height={48} />
        </div>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
          <div className="p-4">
            <p className="font-semibold">{name}</p>
            {/* <p className="text-sm text-gray-500">{email}</p> */}
          </div>
          <div className="border-t border-gray-200">
            {/* <button onClick={() => handleNavClick('network')} className="flex md:hidden items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
              <FaNetworkWired className="mr-2" />
              My Network
            </button> */}
            <button onClick={() => handleNavClick('messaging')} className="flex md:hidden items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
              <FaComments className="mr-2" />
              Messaging
            </button>
            <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <CgProfile className="mr-2" />
              Profile
            </Link>
            <Link href="/notifications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <MdOutlineNotifications className="mr-2" />
              Notifications
            </Link>
          </div>
          <div className="border-t border-gray-200">
            <Link href="/logout" className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100">
              <MdLogout className="mr-2" />
              Log out
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}
