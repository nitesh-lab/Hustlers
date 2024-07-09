import React from 'react'
import JobSearchPage from '@/components/job/Job'
import { auth } from '@/auth';
import { user_obj } from '@/components/auth/Signup';
export default async function page() {
  const user=await auth();
  return (
    <JobSearchPage user={(user?.user) as user_obj}/>
  )
}
