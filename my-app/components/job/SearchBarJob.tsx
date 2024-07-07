"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface users {
  name: string;
  email: string;
  profile_url: string;
  _id: string;
}

export default function InputJob({ placeholder,query,setQuery }: { placeholder?: string,query:string,setQuery:(e:string)=>void}) {
  
   const [loading, setLoading] = useState(false);
   const [results, setResults] = useState<users[]>([{name:"nitesh",email:"",profile_url:"",_id:""}]);
  const [searched, setSearched] = useState(false);


  const search = async (searchQuery: string) => {
    setLoading(true);
    try {
      // Replace this with your actual API call
      console.log("API called with query:", searchQuery);
    } catch (error) {
      console.error('Error fetching search results', error);
      setResults([]);
    }
    setLoading(false);
    setSearched(true);
  };

  useEffect(() => {
    if (query.length > 0) {
      const timer = setTimeout(() => {
        search(query);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setSearched(false);
      setResults([]);
    }
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="relative max-w-[150px] md:w-full sm:max-w-md mx-auto">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          disabled={loading}
          placeholder={placeholder || "Search"}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loading ? (
          <div className="absolute right-3 bottom-1/4 transform -translate-y-1/2">
            <div className="loader w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : query && (
          <FaTimes
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={clearSearch}
          />
        )}
      </div>
      {!loading && searched && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
          <ul>
            {results.map(user => (
              <li key={user._id} className="p-2  hover:bg-gray-200">
                <div className="flex items-center space-x-3">
                  <img src={user.profile_url} alt={user.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <h4 className="text-sm font-medium">{user.name}</h4>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
