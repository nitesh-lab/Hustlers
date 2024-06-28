"use client"

import React, { useState } from 'react';
import PostModal from './PostModal';

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex items-center p-4 border rounded-lg shadow-md bg-white">
      <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
      <button
        className="flex-grow px-4 py-2 text-left text-gray-600 bg-gray-100 rounded-full"
        onClick={openModal}
      >
        What's happening today?
      </button>

      {modalOpen && <PostModal closeModal={closeModal} />}
    </div>
  );
};

export default CreatePost;
