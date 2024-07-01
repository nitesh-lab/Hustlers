import { axiosInstance } from '@/lib/axiosInstance';
import UserCard from '../../../components/Profile/UserCard'
import React from 'react'
import { user_obj } from '@/components/auth/Signup';
import { redirect } from 'next/navigation';

export default async function page({params}:{params:{id:string}}) {

  const {id}=params;
  let user:{data:user_obj}={data:{name:"",email:"",profile_url:"",_id:""}}
  if(id.length==24){
  user=await axiosInstance.post("/api/user/findUser",{_id:id});
  console.log(user.data);
  }
  else{
    redirect("/")
  }

  return (
    <div>
        <UserCard user={(user.data) as user_obj } />
    </div>
  )
}
