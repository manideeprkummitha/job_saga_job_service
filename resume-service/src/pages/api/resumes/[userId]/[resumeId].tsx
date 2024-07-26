import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db';
import { getResumeById, updateResume, deleteResume } from '../../../../services/mongoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { userId, resumeId } = req.query;

  if (req.method === 'GET') {
    try {
      const resume = await getResumeById(userId as string, resumeId as string);
      if (resume) {
        res.status(200).json(resume);
      } else {
        res.status(404).json({ message: 'Resume not found' });
      }
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedResume = await updateResume(resumeId as string, req.body);
      res.status(200).json(updatedResume);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteResume(resumeId as string);
      res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
