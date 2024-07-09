import { auth } from '@/auth';
import { user_obj } from '@/components/auth/Signup';
import CreateJob from '@/components/job/CreateJob'
import React from 'react'

export default async function page() {
  const user=await auth();

  return (
    <>
    <CreateJob user={(user?.user) as user_obj}/>
    </>
  )
}
