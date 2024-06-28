import { auth } from '@/auth'
import SignUpForm, { user_obj } from '@/components/auth/Signup'
import dbConnect from '@/lib/mongoConnect';
import { client } from '@/lib/redisConnect';
import { User, User_Type } from '@/models/user_model';
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {

  const session = await auth();

  let user={};

if (session && session.user &&  session.user.email && session.user.email?.length>0) {

  const user_exists=await client.json.get(session.user.email);

  if(user_exists){  // cache hit user exists.
    redirect("/dashboard");
  }

  else{    // cache miss

  await dbConnect(); // mongo connect.
  const res = await User.findOne({ $or: [{ name: session.user.name }, { email: session.user.email }] });
  
  if (res) {
    await client.json.set(session.user.email,"$",res); // set in cache here

    redirect("/dashboard");
    
  } else {
    user = await User.create({
      name: session.user.name || "",
      email: session.user.email || "",
      profile_url: session.user.image || "",
    });
    await client.json.set(session.user.email,"$",user); // create user set in cache send him to dashboard.
    redirect("/dashboard");
  }
}
}
  
  return (
    <>
    <SignUpForm/>
    </>
  )
}
