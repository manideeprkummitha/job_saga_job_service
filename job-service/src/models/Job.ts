import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string;
  workSchedule: string;
  workLocation: string;
  jobType: string;
  company: {
    name: string;
    industry: string;
    size: string;
    location: string;
  };
  salaryRange: {
    min: number;
    max: number;
  };
  benefits: string;
  perks: string;
  vacationLeave: string;
  incentives: string;
  workLifeBalance: string;
  recruiterId: mongoose.Schema.Types.ObjectId;
  status: 'open' | 'closed';
  applicants: mongoose.Schema.Types.ObjectId[];
  interestingApplicants: mongoose.Schema.Types.ObjectId[];
}

const JobSchema: Schema = new Schema(
  {
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobRequirements: { type: String, required: true },
    workSchedule: { type: String, required: true },
    workLocation: { type: String, required: true },
    jobType: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      industry: { type: String, required: true },
      size: { type: String, required: true },
      location: { type: String, required: true },
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    benefits: { type: String, required: true },
    perks: { type: String, required: true },
    vacationLeave: { type: String, required: true },
    incentives: { type: String, required: true },
    workLifeBalance: { type: String, required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User_management', required: true },
    status: { type: String, enum: ['open', 'closed'], required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
    interestingApplicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InterestingApplicant' }],
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;
