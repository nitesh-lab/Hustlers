import React, { useState } from 'react';
import SearchBar from './SearchInput';

const JobCard = ({title,company,location,salary,alumniCount,applicants,promoted}:{ title?:string
    , company?:string
    , location?:string
    , salary?:string
    , alumniCount?:number
    , applicants?:number
    , promoted?:boolean
    }) => (
  <div className="flex p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4">
    <div className="flex-shrink-0">
      <img
        className="h-12 w-12 rounded-full"
        src="https://via.placeholder.com/48"
        alt={`${company} logo`}
      />
    </div>
    <div className="ml-4">
      <div className="text-lg font-medium">{title}</div>
      <div className="text-gray-600">{company}</div>
      <div className="text-sm text-gray-500">{location}</div>
      {salary && <div className="text-sm text-gray-500">£{salary}/yr</div>}
      {alumniCount && (
        <div className="text-sm text-gray-500">{alumniCount} school alumni works here</div>
      )}
      {applicants && (
        <div className="text-sm text-gray-500">{applicants} applicants</div>
      )}
      {promoted && (
        <div className="text-xs text-green-500 font-bold">Promoted</div>
      )}
    </div>
  </div>
);



const JobPicks = () => (
  <div className="p-8 bg-gray-100 min-h-screen">
    <div className="max-w-2xl mx-auto">
      <SearchBar />
      <h2 className="text-xl font-bold mb-4">Top job picks for you</h2>
      <JobCard
        title="Software Developer Intern"
        company="TECHPLEMENT"
        location="India (Remote)"
        promoted
      />
      <JobCard
        title="Frontend Shopify Developer (Remote)"
        company="Uplers"
        location="Mysore, Karnataka, India (Remote)"
        salary="£13.3k/yr - £17.8k/yr"
        alumniCount={1}
        applicants={23}
        promoted
      />
      <JobCard
        title="AWS Consultant"
        company="Tech Mahindra"
        location="Pune, Maharashtra, India (On-site)"
        alumniCount={27}
        promoted
      />
    </div>
  </div>
);

export default JobPicks;
