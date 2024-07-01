import { axiosInstance } from '@/lib/axiosInstance';
import UserCard from '../../../components/Profile/UserCard'
import React from 'react'
import { user_obj } from '@/components/auth/Signup';
import { redirect } from 'next/navigation';

export default async function page({params}:{params:{id:string}}) {

  const {id}=params;
 
  let user:user_obj={name:"",email:"",profile_url:"",_id:""}
  if(id.length==24){
 
 
  const res=await axiosInstance.post("/api/user/findUser",{_id:id});
  user=res.data.user
 
  }
  else{
    redirect("/")
  }

  return (
    <div>
        <UserCard user={user as user_obj } />
    </div>
  )
}
