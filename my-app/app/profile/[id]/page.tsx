import { axiosInstance } from '@/lib/axiosInstance';
import UserCard from '../../../components/Profile/UserCard'
import React from 'react'
import { user_obj } from '@/components/auth/Signup';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function page({params}:{params:{id:string}}) {

  const {id}=params;
  
  let user:user_obj={name:"",email:"",profile_url:"",_id:""}
  let client=""
  if(id.length==24){
 
 
  const res=await axiosInstance.post("/api/user/findUser",{_id:id});
  const data=await auth();
  client=data?.user?.email!;
  user=res.data.user  
  
  }
  else{
    redirect("/")
  }

  return (
    <div>
        <UserCard user={user as user_obj } client_email={client} />
    </div>
  )
}
