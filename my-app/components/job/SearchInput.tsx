import React, { ChangeEvent } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface InputJobProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputJob: React.FC<InputJobProps> = ({ value, onChange, placeholder }) => {
  const clearSearch = () => {
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="max-w-[150px] md:w-full sm:max-w-md mx-auto">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Search"}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {value && (
          <FaTimes
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default InputJob;
