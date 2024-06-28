import Image from 'next/image';
import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { user_obj } from '../auth/Signup';

export default function PostCard<T extends user_obj>({user}:{user:T}){
  return (
    <div className="max-w-lg mb-[1rem] mx-auto bg-white border rounded-lg shadow-md">
      {/* Profile Section */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="ml-3 flex items-center space-x-2">
          {/* Green button */}
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
             <p className="text-sm font-medium">Vishal Vashisth</p>
          <p className="text-xs text-gray-500">14h</p>
        </div>
        <button className="ml-auto text-blue-600 font-medium">+ Follow</button>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-4">
        <p>Google, IBM and Harvard University are sponsoring Free courses for Python</p>
        <a href="https://lnkd.in/gd_4rBDE" className="text-blue-600">+ 7000+ Course Free Access : https://lnkd.in/gd_4rBDE</a>
      </div>

      {/* Image Section */}
      <div className="relative">
        <Image src="/Images/logo.png" alt="Hand Mudras" className="w-full" width={500} height={300} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-red-500 rounded-full absolute left-1/4 top-1/4"></div>
          <div className="w-12 h-12 border-4 border-red-500 rounded-full absolute right-1/4 top-1/4"></div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex justify-around border-t border-gray-300 py-2">
        <button className="flex items-center text-gray-600 hover:text-gray-800">
          <AiOutlineLike className="mr-1" /> Like
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-800">
          <FaRegComment className="mr-1" /> Comment
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-800">
          <IoMdSend className="mr-1" /> Send
        </button>
      </div>
    </div>
  );
}
