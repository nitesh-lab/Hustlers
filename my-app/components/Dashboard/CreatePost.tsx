"use client"

import React, { useState } from 'react';
import PostModal from './PostModal';
import { user_obj } from '../auth/Signup';
import Image from 'next/image';

const CreatePost = ({user}:{user:user_obj}) => {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex items-center p-4 border rounded-lg shadow-md bg-white">
      <div className="w-12 h-12 rounded-full  mr-4">
        <Image src={user.profile_url} className='rounded-full' alt='nope' width={100} height={100} />
      </div>
      <button
        className="flex-grow px-4 py-2 text-left text-gray-600 bg-gray-100 rounded-full"
        onClick={openModal}
      >
        {"What's"} happening today?
      </button>

      {modalOpen && <PostModal id={user._id} closeModal={closeModal} />}
    </div>
  );
};

export default CreatePost;
