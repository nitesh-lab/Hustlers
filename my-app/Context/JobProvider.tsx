// SearchContext.tsx

import { axiosInstance } from '@/lib/axiosInstance';
import React, { createContext, useState, ReactNode, ChangeEvent } from 'react';

interface SearchParams {
  jobType: "fullTime"|"partTime"|"internship";
  workType: "onSite"|"remote"|"hybrid";
  query: string;
  location: string;
  isLoading:boolean,
  time:Date
}


export interface Job_type {
  category: string;
  company: {
    image: string;
    location: string;
    name: string;
    website: string;
  };
  experience: string;
  jobTitle: string;
  jobType: 'FullTime' | 'PartTime' | 'Intern'; // Adjust as per your specific job types
  openRoles: string;
  posted_time: Date;
  stipend: string;
  work_id: string;
  _id: string;
}

interface SearchContextProps {
  searchParams: SearchParams;
  handleJobTypeChange: (type:"fullTime"|"partTime"|"internship" ) => void;
  Job_data:Job_type[]
  handleWorkTypeChange: (type: "onSite"|"remote"|"hybrid" ) => void;
  handleQueryChange: (e: string) => void;
  handleLocationChange: (e: string) => void;
  handleSearch: () => void;
}

const istTimestamp = new Date();
        istTimestamp.setHours(istTimestamp.getHours() + 5); // Add 5 hours for IST
        istTimestamp.setMinutes(istTimestamp.getMinutes() + 30); // Add 30 minutes for IST


const defaultValues: SearchContextProps = {
  searchParams: {
    jobType: "fullTime",
    workType: "remote",
    query: '',
    location: '',
    isLoading:false,
    time:istTimestamp,
  },
  Job_data:[],
  handleJobTypeChange: () => {},
  handleWorkTypeChange: () => {},
  handleQueryChange: () => {},
  handleLocationChange: () => {},
  handleSearch: () => {},
};


export const SearchContext = createContext<SearchContextProps>(defaultValues);

export const SearchProvider = ({ children }: { children: ReactNode }) => {

  const [jobs,setJobs]=useState<Job_type[]>([]);

  const [searchParams, setSearchParams] = useState<SearchParams>(defaultValues.searchParams);


  const handleJobTypeChange = (inp:"fullTime"|"partTime"|"internship") => {
    setSearchParams((prev) => ({
      ...prev,
      jobType: inp,
    }));
  };

  const handleWorkTypeChange = (inp: "onSite"|"remote"|"hybrid") => {
    setSearchParams((prev) => ({
      ...prev,
      workType:inp
    }));
  };

  const handleQueryChange = (e:string) => {
  
    setSearchParams((s)=>({...s,query:e}));
  
  };

  const handleLocationChange = (e: string) => {
    setSearchParams((prev) => ({ ...prev, location:e }));
  };

  const handleSearch = async() => {

      setSearchParams((prev) => ({
        ...prev,
        isLoading: true,
      }));
      
     const res=await axiosInstance.post("/api/job/findjobs",{query:searchParams.query,
      location:searchParams.location,workType:searchParams.workType,jobType:searchParams.jobType,time:searchParams.time||""})

      console.log(res.data)
      
      setSearchParams((prev) => ({
        ...prev,
        isLoading: false,
      }));
      console.log(res.data);

      setJobs([...res.data.jobs])
    
    };

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        handleJobTypeChange,
        handleWorkTypeChange,
        handleQueryChange,
        handleLocationChange,
        handleSearch,
        Job_data:jobs,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

