"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import React, { useState } from "react";
import { user_obj } from "../auth/Signup";
import Loader from "../common/Loader";


interface error_type{
  jobTitle:string,stipend:string,openRoles:string
}

const NewJobForm = ({user}:{user:user_obj}) => {
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [jobType, setJobType] = useState("FullTime");
  const [openRoles, setOpenRoles] = useState("");
  const [category, setCategory] = useState("Remote");
  const [stipend, setStipend] = useState("");
  const [isLoading,setisloading]=useState(false);

  const [errors, setErrors] = useState({jobTitle:"",stipend:"",openRoles:""});

  const handleJobTitleChange = (e:string) => {
    setJobTitle(e);
  };

  const handleJobTypeChange = (type:string) => {
    setJobType(type);
  };

  const handleOpenRolesChange = (e:string) => {
    setOpenRoles(e);
  };

  const handleCategoryChange = (cat:string) => {
    setCategory(cat);
  };

  const validateForm = () => {
    const newErrors:error_type={} as error_type

    if (!jobTitle) newErrors.jobTitle = "Job title is required";
    if (!stipend) newErrors.stipend = "Stipend is required";
    if (!openRoles || isNaN(Number(openRoles)) || Number(openRoles) <= 0)
      newErrors.openRoles = "Please enter a valid number of open roles";

    return newErrors;
  };

const handleSubmit =  async () => {
   
    const formErrors = validateForm();
    console.log(formErrors)
    if (Object.keys(formErrors).length >0) {
      setErrors(formErrors);
      return;
    }
    setisloading(true);
    setErrors({jobTitle:"",openRoles:"",stipend:""});
    // Handle form submission (e.g., send data to API)
   
      const obj={jobTitle,
      jobType,
      openRoles,
      category,
      stipend,
    }


  const res=await axiosInstance.post("api/job/createjob",{...obj,email:user?.email})

    // Reset form
    setJobTitle("");
    setJobType("FullTime");
    setOpenRoles("1");
    setCategory("Remote");
    setStipend("");
    setisloading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl bg-white mt-8 mx-auto p-6 rounded-md shadow-md w-full">
        <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>
        {/* <form onSubmit={handleSubmit}> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What kind of job is this?
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-200 outline-none rounded-md"
              value={jobTitle}
              onChange={(e)=>{handleJobTitleChange(e.target.value)}}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm">{errors.jobTitle}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a job type
            </label>
            <div className="flex space-x-2">
              {["FullTime", "PartTime", "Intern"].map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`p-2 rounded-md ${
                    jobType === type
                      ? "bg-blue-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleJobTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-200 outline-none rounded-md"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
            />
            {errors.stipend && (
              <p className="text-red-500 text-sm">{errors.stipend}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many open roles?
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-200 outline-none rounded-md"
              value={openRoles}
              onChange={(e)=>{handleOpenRolesChange(e.target.value)}}
            />
            {errors.openRoles && (
              <p className="text-red-500 text-sm">{errors.openRoles}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a category for this job
              <br />
              <p className="text-red-500">(OnSite feature coming soon.)</p>
            </label>
            <div className="flex space-x-2">
              {["Remote"].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`p-2 rounded-md ${
                    category === cat
                      ? "bg-blue-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-md max-w-[200px]"
            onClick={()=>handleSubmit()}
            disabled={isLoading}
            >
             {isLoading ? <Loader/> : "Post new job"}
            </button>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default NewJobForm;
