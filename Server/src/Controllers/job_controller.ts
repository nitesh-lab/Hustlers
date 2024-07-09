import { Request, Response } from "express";
import { User } from "../models/user_model";
import { Job } from "../models/job_model";


export default async function createjob(req:Request,res:Response) {
    
  try {
    const { jobTitle, jobType, openRoles, category, stipend,email } = req.body;

   const work_user= await User.findOne({email:email})

    if(!work_user){
        return res.status(400).json({ message: 'No Such user' });
    }

    // jobTitle: string;
    // jobType: 'FullTime' | 'PartTime' | 'Intern';
    // openRoles: string;
    // category: 'Remote' | 'OnSite';
    // stipend: string;
    // work_id: string;
    // posted_time: Date;
    // jobLocation?: string;
    // experience: string;
    // company: Schema.Types.ObjectId | CompanyDocument;


    const newJob = new Job({
      jobTitle,
      jobType,
      openRoles,
      category,
      stipend,
      work_id:work_user._id,
    });

    await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }





}