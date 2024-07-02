import { getPosts } from '@/lib/actions/posts';
import {PostProvider}  from '../../../Context/PostProvider';
import { auth } from '../../../auth';
import CreatePost from "../../../components/Dashboard/CreatePost";
import PostCard from '../../../components/Dashboard/PostCard';
import Stories from '../../../components/Dashboard/Story';
import TrendNews from '../../../components/Dashboard/TrendNews';
import NavBarDashBoard from '../../../components/NavBarDashBoard';
import { user_obj } from '../../../components/auth/Signup';
import { axiosInstance } from "../../../lib/axiosInstance";
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

export default async function Page() {

  const session = await auth();

  let user = {};

  if (session && session.user && session.user.email && session.user.email?.length > 0) {
    try {
      const res = await axiosInstance.post("api/user/findUser", { email: session.user.email, name: session.user.name });
      if (res.status == 200) {
        user = res.data.user;
      } else {
        redirect("/");
      }
    } catch (e) {
      console.log("error in dashboard/page.tsx line 30")
    }

  } else {
    redirect("/");
  }
  return (
    <>
      <NavBarDashBoard user={(user) as user_obj} />
      {/* <div className='mt-[6rem] w-[90%] mx-[5%] md:w-[80%] md:mx-[10%] flex justify-center'>
        <Stories />
      </div> */}
      <div className="mt-[6rem] grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* 1st section */}
        <div className="lg:col-start-1 lg:col-end-2"></div>

        {/* 2nd section */}
        <div className="lg:col-start-2 lg:col-end-5">
          <PostProvider>
          <CreatePost user={(user) as user_obj} />
          <Suspense fallback={<p>loading...</p>}>
          <PostCard user={(user) as user_obj} />
          </Suspense>
          </PostProvider>
        </div>

        {/* 3rd section */}
        <div className="lg:col-start-5 lg:col-end-6 ml-[1rem] mt-[1rem] hidden lg:block">
          <TrendNews />
        </div>
      </div>

      {/* Additional content removed for brevity */}
    </>
  );
}
