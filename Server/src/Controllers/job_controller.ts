import { Request, Response } from "express";
import { User } from "../models/user_model";
import { Job } from "../models/job_model";


export default async function createjob(req:Request,res:Response) {
    
  try {
    const { jobTitle, jobType, openRoles, category, stipend,user,experience } = req.body;

    const newJob = new Job({
      jobTitle,
      jobType,
      openRoles,
      category,
      stipend,
      jobLocation:user.Company.location,
      posted_time:new Date().toLocaleDateString(),
      work_id:user._id,
      company:user.Company[0]._id,
      experience:experience
    });

    await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }

}