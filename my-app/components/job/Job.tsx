"use client"

import React from "react";

import LeftSection from './LefttSection';

import { user_obj } from '../auth/Signup';
import JobCard from './JobCard';
import { SearchProvider } from "@/Context/JobProvider";
import { TopSection } from "./TopSection";


const JobSearchPage=({user}:{user:user_obj}) => {
 
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



