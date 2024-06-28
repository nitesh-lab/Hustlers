import React from 'react'

export default function Profiles() {
  return (
   <>
   <div className='col-span-1  lg:col-start-5 lg:col-end-7'>
        <div className="border-t px-6 py-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-medium">Other similar profiles</h3>
          <div className="mt-4">
            {[
              { name: "KARTIK MISTRY", description: "DS & ML Developer | Passionpreneur | UI & UX...", connection: "3rd+" },
              { name: "Saurabh Tambat", description: "Front End Developer | Bridging the Gap Between #Front-end...", connection: "3rd+" },
              { name: "Omkar Salvi", description: "KJSCE'24", connection: "3rd+" },
              { name: "Omprakash Mahto", description: "--", connection: "3rd+" },
              { name: "Arman Salmani", description: "Student at Bhavans College", connection: "3rd+" },
            ].map((profile, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="ml-4">
                    <h4 className="text-md font-medium">{profile.name}</h4>
                    <p className="text-gray-600 text-sm">{profile.description}</p>
                    <p className="text-gray-400 text-xs">{profile.connection}</p>
                  </div>
                </div>
                <button className="text-blue-700 border border-blue-700 rounded-full px-4 py-1 text-sm">{index % 2 === 0 ? 'Follow' : 'Message'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
   </>
  )
}
