import { auth } from '@/auth'
import BusinessForm from '@/components/common/BusinessForm'
import { axiosInstance } from '@/lib/axiosInstance';
import React from 'react'

export default async  function page() {

   const res=await auth();

  return (
    <>
    <BusinessForm email={res?.user?.email||"" }/>
    </>
  )
}
