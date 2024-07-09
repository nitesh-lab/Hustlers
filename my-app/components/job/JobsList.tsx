"use client"
import React, { useContext } from 'react'
import JobCard from './JobCard'
import { SearchContext } from '@/Context/JobProvider';

export default function JobsList() {
    const {Job_data}=useContext(SearchContext);
  return (
    <div className="flex flex-col space-y-6">
    {
      Job_data.length>0 && Job_data.map((e,i)=>{
        return <JobCard key={i} obj={e}/>
      })
    }
  </div>
  )
}
