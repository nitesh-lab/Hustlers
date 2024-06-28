import { auth } from '@/auth';
import CreatePost from '@/components/Dashboard/CreatePost';
import PostCard from '@/components/Dashboard/PostCard';
import Stories from '@/components/Dashboard/Story';
import TrendNews from '@/components/Dashboard/TrendNews';
import NavBarDashBoard from '@/components/NavBarDashBoard';
import { user_obj } from '@/components/auth/Signup';
import dbConnect from '@/lib/mongoConnect';
import { client } from '@/lib/redisConnect';
import { User } from '@/models/user_model';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {

  const session = await auth();

  let user={};

if (session && session.user &&  session.user.email && session.user.email?.length>0) {


  const user_exists=await client.json.get(session.user.email);

  if(user_exists){  // cache hit user exists.
    
    user=user_exists;

  }
  else{    // cache miss

    await dbConnect(); // mongo connect.
    const res = await User.findOne({ $or: [{ name: session.user.name }, { email: session.user.email }] });
    
    if (res) {
      await client.json.set(session.user.email,"$",res); // set in cache here 
      user=res; 
    } else {
      redirect("/");
    }
  }


}
else{
  redirect("/");
}
  return (
    <>
    <NavBarDashBoard user={(user)as user_obj}/>
    <div className='mt-[6rem] w-[90%] mx-[5%] md:w-[80%] md:mx-[10%] flex justify-center'>
    <Stories/>
    </div>
    <div className="mt-[1rem] grid grid-cols-5 gap-4">
      {/* 1st section */}
      <div className="col-start-1 col-end-2"></div>

      {/* 2nd section */}
      <div className="col-start-2 col-end-5">
        <CreatePost/>
        <PostCard  user={(user)as user_obj}/>
      </div>

      {/* 3rd section */}
      <div className="col-start-5 col-end-6 ml-[1rem] mt-[1rem]  hidden lg:block">
        <TrendNews />
      </div>
    </div> 
    
     {/* <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-white p-4">
          <div className="mb-4">
            <img src="profile.jpg" alt="Profile" className="w-20 h-20 rounded-full mx-auto md:mx-0" />
            <h2 className="text-center md:text-left text-xl font-semibold">Anna Yoast</h2>
            <p className="text-center md:text-left text-gray-500">@annayoast</p>
          </div>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="text-gray-600 hover:text-black">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-black">Team</a>
            <a href="#" className="text-gray-600 hover:text-black">Projects</a>
            <a href="#" className="text-gray-600 hover:text-black">Calendar</a>
            <a href="#" className="text-gray-600 hover:text-black">Documents</a>
            <a href="#" className="text-gray-600 hover:text-black">Reports</a>
          </nav>
          <div className="mt-4">
            <p>Your trial expires soon</p>
            <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">Upgrade</button>
          </div>
          <nav className="mt-4 flex flex-col space-y-2">
            <a href="#" className="text-gray-600 hover:text-black">Releases</a>
            <a href="#" className="text-gray-600 hover:text-black">Settings</a>
          </nav>
          <div className="mt-4 flex items-center">
            <img src="user.jpg" alt="User" className="w-8 h-8 rounded-full" />
            <span className="ml-2 text-gray-600">Bianca Blooms</span>
          </div>
        </aside>

        <main className="w-full md:w-3/4 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <img src="profile.jpg" alt="Profile" className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">Anna Yoast</h2>
                <p className="text-gray-500">@annayoast</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Reports</button>
              <button className="ml-2 bg-gray-300 text-black py-2 px-4 rounded">Add</button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">About Anna</h3>
            <p className="text-gray-600">
              With a strong foundation in software development and a keen eye for user experience, I've been fortunate enough to lead teams in bringing various successful products to life.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-semibold">How to share your files</h4>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
              <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">Play</button>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-semibold">How to keep your files safe</h4>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
              <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">Play</button>
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Ranking</h3>
            <p className="text-2xl font-bold">96/100</p>
            <p className="text-gray-600">3 pts ↑ vs last month</p>
          </div>
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Skills</h3>
            <p className="text-gray-600">Managing, Figma, UX design</p>
          </div>
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Locations</h3>
            <p className="text-gray-600">Phone: <a href="#" className="text-blue-500">Click to view</a></p>
            <p className="text-gray-600">Email: annayoast@thel.studio</p>
          </div>
        </main>
      </div>
    </div> */}
    </>
  );
}
