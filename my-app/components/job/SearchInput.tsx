"use client";
import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    experience: '',
    city: '',
    distance: '',
  });

  return (
    <div className="relative mb-6 flex items-center">
      <input
        type="text"
        className="w-2/3 p-2 border border-gray-300 rounded-l-lg"
        placeholder="Search for jobs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="w-1/3 flex">
        <select
          className="w-1/3 p-2 border border-gray-300 rounded-r-none"
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
        >
          <option value="">Experience</option>
          <option value="0-2">0-2 years</option>
          <option value="2-5">2-5 years</option>
          <option value="5+">5+ years</option>
        </select>
        <select
          className="w-1/3 p-2 border-t border-b border-gray-300"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">City</option>
          <option value="Remote">Remote</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="India">India</option>
        </select>
        <select
          className="w-1/3 p-2 border border-gray-300 rounded-r-lg"
          value={filters.distance}
          onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
        >
          <option value="">Distance</option>
          <option value="5km">5km</option>
          <option value="10km">10km</option>
          <option value="20km">20km</option>
        </select>
      </div>
    </div>
  );
};

