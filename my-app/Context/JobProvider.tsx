// SearchContext.tsx
import React, { createContext, useState, ReactNode, ChangeEvent } from 'react';


interface SearchParams {
  jobType: "fullTime"|"partTime"|"internship";
  workType: "onSite"|"remote"|"hybrid";
  query: string;
  location: string;
  isLoading:boolean,
}

interface SearchContextProps {
  searchParams: SearchParams;
  handleJobTypeChange: (type:"fullTime"|"partTime"|"internship" ) => void;
  handleWorkTypeChange: (type: "onSite"|"remote"|"hybrid" ) => void;
  handleQueryChange: (e: string) => void;
  handleLocationChange: (e: string) => void;
  handleSearch: () => void;
}

const defaultValues: SearchContextProps = {
  searchParams: {
    jobType: "fullTime",
    workType: "onSite",
    query: '',
    location: '',
    isLoading:false,
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

  const handleSearch = () => {

      setSearchParams((prev) => ({
        ...prev,
        isLoading: true,
      }));
   
      
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
