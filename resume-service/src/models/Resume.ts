import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  resumeName: { type: String, required: true },
  resumeDocument: { type: String, required: true },
  jobPosition: { type: String, required: true },
  company: { type: String, required: true },
  dateSaved: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' }
});

const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume;
