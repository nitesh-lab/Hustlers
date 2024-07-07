"use client";

import React, { useState, ChangeEvent, useContext } from 'react';
import InputJob from './SearchBarJob';
import LeftSection from './LefttSection';
import { FaSearch } from 'react-icons/fa';
import { SearchContext, SearchProvider } from '@/Context/JobProvider';

interface JobCardProps {
  company: string;
  title: string;
  location: string;
  salary: string;
  posted: string;
}

const JobCard = ({ company, title, location, salary, posted }: JobCardProps) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
    <div className="flex items-center space-x-3">
      <img src={`/logos/${company.toLowerCase()}.png`} alt={company} className="w-10 h-10" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">{company}</span>
      </div>
    </div>
    <div className="text-gray-500">
      <span className="block">{location}</span>
      <span className="block">{salary}</span>
      <span className="block">{posted}</span>
    </div>
    <button className="self-start px-3 py-1 bg-green-500 text-white rounded-md">
      Details
    </button>
  </div>
);



const JobSearchPage: React.FC = () => {
 
  return (
    <SearchProvider>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <TopSection />
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
          <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0">
            <LeftSection/>
          </aside>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mt-4 mb-6">
              <span className="text-gray-700">Search results</span>
            </div>
            <div className="flex flex-col space-y-6">
              <JobCard
                company="Twitter"
                title="UI/UX Designer"
                location="Jakarta, Indonesia"
                salary="$2,000 - $3,000 USD"
                posted="Posted 10 mins ago"
              />
              <JobCard
                company="Clubhouse"
                title="UI/UX Designer"
                location="Jakarta, Indonesia"
                salary="$3,000 - $3,500 USD"
                posted="Posted 10 mins ago"
              />
              <JobCard
                company="Quora"
                title="UI/UX Designer"
                location="Jakarta, Indonesia"
                salary="$2,000 - $3,000 USD"
                posted="Posted 10 mins ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </SearchProvider>
  );
};

export default JobSearchPage;


const TopSection = () => {

  const {handleSearch,handleQueryChange,handleLocationChange,searchParams}=useContext(SearchContext);

  return (
    <div className="bg-white p-6 shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0 w-full md:w-auto">
        <h1 className="text-2xl font-semibold">Hustlers</h1>
        <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0 md:ml-4">
         {searchParams.query.length>0  && searchParams.isLoading &&  <><button className="text-blue-500 font-semibold">{searchParams.query}</button>
          <span className="text-sm text-green-500">(New)</span></>}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 flex-grow items-center w-full md:w-auto">
        <div className="flex-grow w-[100%] md:w-[50%]">
          <InputJob query={searchParams.query} setQuery={handleQueryChange} placeholder="Job"  />
         
        </div>
        <div className="flex-grow w-full md:w-[20%]">
          <InputJob placeholder="Location" query={searchParams.location} setQuery={handleLocationChange} />
        </div>
        <div className="w-[100%] md:w-auto flex justify-center md:justify-end">
          <button
            onClick={handleSearch}
            className="min-w-[100px] flex justify-center md:w-auto p-2 bg-green-500 text-white rounded-md sm:px-4 sm:py-2"
          >
            <FaSearch className='w-[1rem] h-[1rem]' />
          </button>
        </div>
      </div>
    </div>
  );
};
