import Image from 'next/image';
import React, { useState } from 'react';

const PostModal = ({ closeModal}:{closeModal:()=>void}) => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState("");

  const handleImageUpload = (e:any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handlePost = () => {
    // Handle post creation logic here
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 text-white rounded-lg p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-400"></div>
          <div>
            <div className="font-bold">Ezra Aung</div>
            <div className="text-sm text-gray-400">@ezraaung</div>
          </div>
        </div>
        <textarea
          className="w-full h-24 p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4"
          placeholder="What's happening today?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        {image && (
          <div className="mb-4 flex justify-center">
            <Image
              src={image}
              alt="Uploaded"
              height={48}
              width={48}
              className="  w-[200px] h-[150px]  sm:max-w-full  sm:max-h-64 md:max-h-80 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center cursor-pointer space-x-2 text-blue-400"
          >
            <i className="fas fa-camera"></i>
            <span>Photo</span>
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
