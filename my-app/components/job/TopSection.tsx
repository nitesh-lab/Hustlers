
import { FaSearch } from 'react-icons/fa';
import InputJob from './SearchBarJob';
import { useContext } from 'react';
import { SearchContext } from '@/Context/JobProvider';

export const TopSection = () => {

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
              className="min-w-[100px] flex justify-center md:w-auto p-2 bg-blue-400 text-white rounded-md sm:px-4 sm:py-2"
            >
              <FaSearch className='w-[1rem] h-[1rem]' />
            </button>
          </div>
        </div>
      </div>
    );
  };