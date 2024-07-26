import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db';
import { getUserResumes } from '../../../../services/mongoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const resumes = await getUserResumes(userId as string);
      res.status(200).json(resumes);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
