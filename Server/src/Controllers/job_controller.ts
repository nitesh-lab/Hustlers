import { Request, Response } from "express";
import { User } from "../models/user_model";
import { Job } from "../models/job_model";


export  async function createjob(req:Request,res:Response) {
    
  try {
    const { jobTitle, jobType, openRoles, category, stipend,user,experience } = req.body;

    const istTimestamp = new Date();
        istTimestamp.setHours(istTimestamp.getHours() + 5); // Add 5 hours for IST
        istTimestamp.setMinutes(istTimestamp.getMinutes() + 30); // Add 30 minutes for IST

    const newJob = new Job({
      jobTitle,
      jobType,
      openRoles,
      category,
      stipend,
      jobLocation:user.Company.location,
      posted_time:istTimestamp,
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

export async function findjobs(req: Request, res: Response): Promise<void> {
  const { query, location, workType, jobType, time } = req.body;
  console.log("time=")
  console.log(new Date(time));

  try {
    // Define query criteria based on provided filters
    const queryCriteria: any = {
      $and: [
        { jobTitle: { $regex: new RegExp(query, 'i') } }, // Case-insensitive regex for jobTitle
         { posted_time: { $lte: new Date(time)} }, // Jobs posted before specified time
        {
          $or: [
            { jobType: { $regex: new RegExp(jobType, 'i') } }, // Case-insensitive regex for jobType
            { category: { $regex: new RegExp(workType, 'i') } } // Case-insensitive regex for category/ workType
          ]
        }
      ]
    };
    // Fetch jobs using Mongoose with the defined criteria, populate the related fields, and limit the results
    const jobs = await Job.find(queryCriteria)
      .limit(10)
      .populate({ path: 'work_id', select: '-password' })
      .populate({ path: 'company' })
      .exec();

    // Respond with the fetched jobs
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching jobs' });
  }


}

