import mongoose, { Document, Schema } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  resume: string;
  coverLetter: string;
  dateApplied: Date;
  status: 'submitted' | 'reviewed' | 'interview' | 'hired' | 'rejected';
}

const JobApplicationSchema: Schema = new Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User_management', required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String, required: false },
    dateApplied: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['submitted', 'reviewed', 'interview', 'hired', 'rejected'], required: true },
  },
  { timestamps: true }
);

// Use `mongoose.models` to check if the model already exists
const JobApplication = mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;
