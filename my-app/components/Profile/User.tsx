"use client";
import React, { useState } from 'react';
import { user_obj } from '../auth/Signup';
import { axiosInstance } from '@/lib/axiosInstance';

export default function User({ user, client_email,isFollow }: { user: user_obj, client_email: string ,isFollow:boolean}) {
  const [isLoading, setIsLoading] = useState(false);
   const [isFollowing, setIsFollowing] = useState(isFollow);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/user/follow', { userId: user._id, client_email: client_email });
      if (response.status === 200) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/user/unfollow', { userId: user._id, client_email: client_email });
      if (response.status === 200) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="col-span-1 lg:col-start-1 lg:col-end-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 h-24 w-full"></div>
        <div className="flex justify-center -mt-12">
          <div className="bg-white border border-gray-200 rounded-full overflow-hidden">
            <img src={user.profile_url} alt="profile" className="h-24 w-24 object-cover" />
          </div>
        </div>
        <div className="text-center px-6 py-4">
          {/* <h2 className="text-xl font-medium">{user.name}</h2>
          <p className="text-gray-600">Attended Bhavans College</p>
          <p className="text-gray-600">Mumbai, Maharashtra, India</p> */}
          <div className="mt-4">
            <button
              className={`text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleFollow}
              disabled={isLoading || isFollowing}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-blue-700" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                </svg>
              ) : isFollowing ? 'Following' : 'Follow'}
            </button>
            {isFollowing && (
              <button
                className="text-red-700 border border-red-700 rounded-full px-4 py-1 text-sm ml-2"
                onClick={handleUnfollow}
                disabled={isLoading}
              >
                 {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-blue-700" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                </svg>
              ) : 'UnFollow'}
              </button>
            )}
          </div>
        </div>
        <div className="border-t px-6 mt-[2rem] py-3">
          <div className="flex justify-between items-center">
            <div>
              <button className="text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm">Open to work</button>
              {/* <span className="text-gray-600 ml-2">Software Engineer roles</span> */}
            </div>
            <button className="text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm">Share</button>
          </div>
        </div>

        <div className="border-t mt-[1rem] px-6 py-4">
          <h3 className="text-lg font-medium">Analytics</h3>
          <div className="flex justify-between mt-2">
            <div className="text-center">
              <p className="text-gray-600">1 profile view</p>
              <p className="text-gray-400 text-sm">Discover who viewed your profile.</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">0 post impressions</p>
              <p className="text-gray-400 text-sm">Start a post to increase engagement. Past 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
