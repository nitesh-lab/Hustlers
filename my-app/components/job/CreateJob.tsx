"use client"

import React, { useState } from 'react';

const CreateJob = () => {
  const [employmentType, setEmploymentType] = useState([]);
  const [workingSchedule, setWorkingSchedule] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [salaryNegotiable, setSalaryNegotiable] = useState(false);
  const [hiringMultiple, setHiringMultiple] = useState(false);

  const handleEmploymentTypeChange = (type) => {
    setEmploymentType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">New Job</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Employment type</label>
        <div className="flex flex-wrap gap-4">
          {['Full-time', 'Part-time', 'On demand', 'Negotiable'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={employmentType.includes(type)}
                onChange={() => handleEmploymentTypeChange(type)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Working schedule</label>
        <select
          value={workingSchedule}
          onChange={(e) => setWorkingSchedule(e.target.value)}
          className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Pick working schedule</option>
          <option value="Monday to Friday">Monday to Friday</option>
          <option value="Weekend availability">Weekend availability</option>
          <option value="Day shift">Day shift</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
        <div className="flex flex-wrap gap-4">
          {['Hourly', 'Custom'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="salaryType"
                value={type}
                checked={salaryType === type}
                onChange={() => setSalaryType(type)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {salaryType === 'Hourly' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hourly rate</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="$35"
            />
            <label className="flex items-center mt-4 space-x-2">
              <input
                type="checkbox"
                checked={salaryNegotiable}
                onChange={() => setSalaryNegotiable(!salaryNegotiable)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Salary is negotiable</span>
            </label>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Hiring multiple candidates?</label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hiringMultiple}
            onChange={() => setHiringMultiple(!hiringMultiple)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Yes, I am hiring multiple candidates</span>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button className="py-2 px-4 bg-gray-500 text-white rounded-md">Back: About</button>
        <button className="py-2 px-4 bg-blue-600 text-white rounded-md">Next: Application</button>
      </div>
    </div>
  );
};

export default CreateJob;
