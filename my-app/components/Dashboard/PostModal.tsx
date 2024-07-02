import Image from 'next/image';
import React, { useState } from 'react';
import { axiosInstance } from '../../lib/axiosInstance';
import { usePostContext } from '../../Context/PostProvider';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

const PostModal = ({ closeModal, id = "26" }: { closeModal: () => void, id: string }) => {
  const { setPosts } = usePostContext();
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState<Blob>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handlePost = async () => {
    if (!postText || !image) {
      setError('Please fill out both the text and image fields.');
      return;
    }

    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('text', postText);
    formData.append('id', id);
    formData.append('image', image);

    try {
      const res = await axiosInstance.post('api/user/post', formData);
      setPosts((s) => [res.data.user, ...s]);
      closeModal();
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const isPostDisabled = !postText || !image || loading;

  return (
    <div
      className="fixed inset-0 top-[5rem] bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 text-white rounded-lg p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full "><Image src={"/Images/logo.png"} width={48} height={48} alt="nope"  /></div>
          <div>
            <div className="font-bold">Hustlers</div>
            <div className="text-sm text-gray-400">@hustlers</div>
          </div>
        </div>
        <textarea
          className="w-full h-24 p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4"
          placeholder="What's happening today?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {image && (
          <div className="mb-4 flex justify-center">
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              height={48}
              width={48}
              className="w-[200px] h-[150px] sm:max-w-full sm:max-h-64 md:max-h-80 object-cover rounded-lg"
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
            className={`px-4 py-2 rounded-lg ${isPostDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            disabled={isPostDisabled}
          >
            {loading ? <Loader /> : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
