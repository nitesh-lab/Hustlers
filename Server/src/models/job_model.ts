import mongoose, { Document, Schema } from 'mongoose';

// Define the Company interface
interface CompanyDocument extends Document {
  name: string;
  location: string;
  website?: string;
  image:string,
}

// Define the Job interface
interface JobDocument extends Document {
  jobTitle: string;
  jobType: 'FullTime' | 'PartTime' | 'Intern';
  openRoles: string;
  category: 'Remote' | 'OnSite';
  stipend: string;
  work_id: string;
  posted_time: Date;
  jobLocation?: string;
  experience: string;
  company: Schema.Types.ObjectId | CompanyDocument;
}

// Define the Company schema
const companySchema = new Schema<CompanyDocument>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  image:{
    type:String,
   required:false,
  }
});

export const Company = mongoose.model<CompanyDocument>('Company', companySchema);

// Define the Job schema
const jobSchema = new Schema<JobDocument>({
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['FullTime', 'PartTime', 'Intern'],
    required: true,
  },
  openRoles: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Remote', 'OnSite'], // Add more categories if needed
    required: true,
  },
  stipend: {
    type: String,
    required: true,
  },
  work_id: {
    type: String,
    required: true,
  },
  posted_time: {
    type:Date,
    required: true,
    default:new Date(),
  },
  jobLocation: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  }
});

export const Job = mongoose.model<JobDocument>('Job', jobSchema);
