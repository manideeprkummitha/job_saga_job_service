import mongoose, { Document, Schema } from 'mongoose';

export interface IJobTracking extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  jobPosition: string;
  company: string;
  salaryRange: string;
  location: string;
  status: 'draft' | 'active' | 'archived';
  dateSaved: Date;
  dateApplied: Date;
  followUp: string;
}

const JobTrackingSchema: Schema = new Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User_management', required: true },
    jobPosition: { type: String, required: true },
    company: { type: String, required: true },
    salaryRange: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['draft', 'active', 'archived'], required: true },
    dateSaved: { type: Date, required: true, default: Date.now },
    dateApplied: { type: Date, required: false },
    followUp: { type: String, default: '' },
  },
  { timestamps: true }
);

// Use `mongoose.models` to check if the model already exists
const JobTracking = mongoose.models.JobTracking || mongoose.model<IJobTracking>('JobTracking', JobTrackingSchema);

export default JobTracking;
