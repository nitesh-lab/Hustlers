import { axiosInstance } from '@/lib/axiosInstance';
import UserCard from '../../../components/Profile/UserCard'
import React from 'react'
import { user_obj } from '@/components/auth/Signup';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function page({params}:{params:{id:string}}) {

  const {id}=params;
  
  let user:user_obj={name:"",email:"",profile_url:"",_id:""}
  let isFollowing=false;
  let client=""
  if(id.length==24){
  
    const data=await auth();
    client=data?.user?.email!;
    
    const res=await axiosInstance.post("/api/user/findUser",{_id:id,client_email:data?.user?.email}); // client searching for a  user with that id.
  
    user=res.data.user
    isFollowing=res.data.isPresent 
  }
  else{
    redirect("/")
  }

  return (
    <div>
        <UserCard user={user as user_obj } client_email={client} isFollowing={isFollowing} />
    </div>
  )
}
