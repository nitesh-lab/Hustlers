import { auth } from '@/auth';
import { user_obj } from '@/components/auth/Signup';
import CreateJob from '@/components/job/CreateJob'
import { axiosInstance } from '@/lib/axiosInstance';
import React from 'react'

export default async function page() {
  
  let user=await auth();
  let res=await axiosInstance.post("/api/user/create",{email:user?.user?.email||"",name:user?.user?.name,type:"company"})

  return (
    <>
    <CreateJob user={(res.data.user) as user_obj}/>
    </>
  )
}
