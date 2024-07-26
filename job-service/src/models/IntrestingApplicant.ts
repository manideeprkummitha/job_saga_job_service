import mongoose, { Document, Schema } from 'mongoose';

export interface IInterestingApplicant extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  applicantId: mongoose.Schema.Types.ObjectId;
  notes: string;
  markedBy: mongoose.Schema.Types.ObjectId;
}

const InterestingApplicantSchema: Schema = new Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User_management', required: true },
    notes: { type: String, required: false },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User_management', required: true },
  },
  { timestamps: true }
);

// Check if the model is already defined
const InterestingApplicant = mongoose.models.InterestingApplicant || mongoose.model<IInterestingApplicant>('InterestingApplicant', InterestingApplicantSchema);

export default InterestingApplicant;
