"use client";
import { active_action } from '@/lib/Slices/DashBoardSlice';
import { useAppDispatch, useAppSelector } from '@/lib/reduxhooks';
import React from 'react';
import { FaBriefcase, FaHome, FaComments, FaNetworkWired } from 'react-icons/fa';

export default function Services() {
  const active = useAppSelector((state) => state.dashboard.active);
  const dispatch = useAppDispatch();

  function handleNavClick(navItem) {
    dispatch(active_action(navItem));
  }


  return (
    <>
      <li className={`flex items-center hover:cursor-pointer ${active === 'home' ? 'border-b-2 border-black' : ''}`} onClick={() => handleNavClick('home')}>
        <FaHome className="text-gray-700 hidden md:inline" />
        <span className="hidden md:block py-2 px-3 text-gray-700">Home</span>
        <FaHome className="text-gray-700 md:hidden" />
      </li>
      <li className={`flex items-center hover:cursor-pointer ${active === 'jobs' ? 'border-b-2 border-black' : ''}`} onClick={() => handleNavClick('jobs')}>
        <FaBriefcase className="text-gray-700 hidden md:inline" />
        <span className="hidden md:block py-2 px-3 text-gray-700">Jobs</span>
        <FaBriefcase className="text-gray-700 md:hidden" />
      </li>
      {/* The following items will only show in the dropdown on small screens */}

    <li className={`md:flex items-center hidden hover:cursor-pointer ${active === 'network' ? 'border-b-2 border-black' : ''}`} onClick={() => handleNavClick('network')}>
        <FaNetworkWired className="text-gray-700 hidden md:inline" />
        <span className="hidden md:block py-2 px-3 text-gray-700">Networking</span>
        <FaNetworkWired className="text-gray-700 md:hidden" />
      </li>

      
<li className={`md:flex items-center hidden hover:cursor-pointer ${active ==="messaging" ? 'border-b-2 border-black' : ''}`} onClick={() => handleNavClick("messaging")}>
        <FaComments className="text-gray-700 hidden md:inline" />
        <span className="hidden md:block py-2 px-3 text-gray-700">Messaging</span>
        <FaComments className="text-gray-700 md:hidden" />
      </li>
    </>
  );
}
