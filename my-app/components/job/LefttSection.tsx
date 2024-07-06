import React, { ChangeEvent } from 'react';

interface Props {
  jobType: {
    fullTime: boolean;
    internship: boolean;
    partTime: boolean;
  };
  workType: {
    onSite: boolean;
    remote: boolean;
    hybrid: boolean;
  };
  onJobTypeChange: (type: 'fullTime' | 'internship' | 'partTime') => void;
  onWorkTypeChange: (type: 'onSite' | 'remote' | 'hybrid') => void;
}

const LeftSection: React.FC<Props> = ({ jobType, workType, onJobTypeChange, onWorkTypeChange }) => {
  const handleJobTypeChange = (type: 'fullTime' | 'internship' | 'partTime') => {
    onJobTypeChange(type);
  };

  const handleWorkTypeChange = (type: 'onSite' | 'remote' | 'hybrid') => {
    onWorkTypeChange(type);
  };

  return (
    <div className="p-4 rounded-xl space-y-4">
      {/* Job Type Section */}
      <div>
        <h3 className="text-lg font-semibold">Job Type</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobType.fullTime}
              onChange={() => handleJobTypeChange('fullTime')}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-gray-700">Full-time</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobType.internship}
              onChange={() => handleJobTypeChange('internship')}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-gray-700">Internship</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={jobType.partTime}
              onChange={() => handleJobTypeChange('partTime')}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-gray-700">Part-time</span>
          </label>
        </div>
      </div>
  
      {/* Work Type Section */}
      <div>
        <h3 className="text-lg font-semibold">Work Type</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={workType.onSite}
              onChange={() => handleWorkTypeChange('onSite')}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-gray-700">On-site</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={workType.remote}
              onChange={() => handleWorkTypeChange('remote')}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-gray-700">Remote</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={workType.hybrid}
              onChange={() => handleWorkTypeChange('hybrid')}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-gray-700">Hybrid</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
