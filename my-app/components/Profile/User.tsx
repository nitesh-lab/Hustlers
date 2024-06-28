import React from 'react'

export default function User() {
  return (
   <>
    <div className="col-span-1 lg:col-start-1 lg:col-end-5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 h-24 w-full"></div>
        <div className="flex justify-center -mt-12">
          <div className="bg-white border border-gray-200 rounded-full overflow-hidden">
            <img src="path-to-placeholder-image" alt="profile" className="h-24 w-24 object-cover" />
          </div>
        </div>
        <div className="text-center px-6 py-4">
          <h2 className="text-xl font-medium">S T</h2>
          <p className="text-gray-600">Attended Bhavans College</p>
          <p className="text-gray-600">Mumbai, Maharashtra, India</p>
          <div className="mt-4">
            <button className="text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm">Open to</button>
          </div>
        </div>
        <div className="border-t px-6 mt-[2rem] py-3">
          <div className="flex justify-between items-center">
            <div>
              <button className="text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm">Open to work</button>
              <span className="text-gray-600 ml-2">Software Engineer roles</span>
            </div>
            <button className="text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm">Share</button>
          </div>
        </div>

        <div className="border-t mt-[1rem] px-6 py-4">
          <h3 className="text-lg font-medium">Analytics</h3>
          <div className="flex justify-between mt-2">
            <div className="text-center">
              <p className="text-gray-600">1 profile view</p>
              <p className="text-gray-400 text-sm">Discover who's viewed your profile.</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">0 post impressions</p>
              <p className="text-gray-400 text-sm">Start a post to increase engagement. Past 7 days</p>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}
