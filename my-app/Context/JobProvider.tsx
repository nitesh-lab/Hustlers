// SearchContext.tsx
import React, { createContext, useState, ReactNode, ChangeEvent } from 'react';

// Define types for search parameters
interface JobType {
  fullTime: boolean;
  partTime: boolean;
  internship: boolean;
}

interface WorkType {
  onSite: boolean;
  remote: boolean;
  hybrid: boolean;
}

interface SearchParams {
  jobType: JobType;
  workType: WorkType;
  query: string;
  location: string;
}

interface SearchContextProps {
  searchParams: SearchParams;
  handleJobTypeChange: (type: keyof JobType) => void;
  handleWorkTypeChange: (type: keyof WorkType) => void;
  handleQueryChange: (e: string) => void;
  handleLocationChange: (e: string) => void;
  handleSearch: () => void;
}

const defaultValues: SearchContextProps = {
  searchParams: {
    jobType: {
      fullTime: true,
      partTime: false,
      internship: false,
    },
    workType: {
      onSite: false,
      remote: false,
      hybrid: false,
    },
    query: '',
    location: '',
  },
  handleJobTypeChange: () => {},
  handleWorkTypeChange: () => {},
  handleQueryChange: () => {},
  handleLocationChange: () => {},
  handleSearch: () => {},
};

export const SearchContext = createContext<SearchContextProps>(defaultValues);

export const SearchProvider = ({ children }: { children: ReactNode }) => {

  const [searchParams, setSearchParams] = useState<SearchParams>(defaultValues.searchParams);

  const handleJobTypeChange = (type: keyof JobType) => {
    setSearchParams((prev) => ({
      ...prev,
      jobType: { ...prev.jobType, [type]: !prev.jobType[type] },
    }));
  };

  const handleWorkTypeChange = (type: keyof WorkType) => {
    setSearchParams((prev) => ({
      ...prev,
      workType: { ...prev.workType, [type]: !prev.workType[type] },
    }));
  };

  const handleQueryChange = (e:string) => {
  
    setSearchParams((s)=>({...s,query:e}));
  
  };

  const handleLocationChange = (e: string) => {
    setSearchParams((prev) => ({ ...prev, location:e }));
  };

  const handleSearch = () => {
    console.log('Searching with params:', searchParams);
    // Implement search functionality here
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
