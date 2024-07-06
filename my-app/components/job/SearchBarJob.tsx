"use client"
import { axiosInstance } from '@/lib/axiosInstance';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';


interface users{name: string, email: string,profile_url: string,_id:string }

export default function InputJob({placeholder}:{placeholder?:string}){

      const [query, setQuery] = useState('');
      const [loading, setLoading] = useState(false);
      const [results, setResults] = useState<users[]>([]);
    
      const [searched, setSearched] = useState(false);
    
      const search = async (searchQuery: string) => {
        setLoading(true);
        try {
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
        <div className="max-w-[150px] md:w-full sm:max-w-md mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleChange}
              disabled={loading}
              placeholder={placeholder||"Search"}
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
          {!loading && searched && (
           <p>good to go</p>
          )}
        </div>
      );
    }
