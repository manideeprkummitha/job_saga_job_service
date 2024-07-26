import Resume from '../models/Resume';

export const saveResumeDetails = async (details: {
  userId: string;
  resumeName: string;
  resumeDocument: string;
  jobPosition: string;
  company: string;
}) => {
  const newResume = new Resume(details);
  await newResume.save();
};

export const getUserResumes = async (userId: string) => {
  return Resume.find({ userId });
};

export const getResumeById = async (userId: string, resumeId: string) => {
  return Resume.findOne({ userId, _id: resumeId });
};

export const updateResume = async (resumeId: string, updateData: Partial<typeof Resume>) => {
  return Resume.findByIdAndUpdate(resumeId, updateData, { new: true });
};

export const deleteResume = async (resumeId: string) => {
  return Resume.findByIdAndDelete(resumeId);
};
