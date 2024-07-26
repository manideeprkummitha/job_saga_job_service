import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import InterestingApplicant from '@/models/IntrestingApplicant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  console.log(`Received ${method} request`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching interesting applicants data');
        const applicants = await InterestingApplicant.find({});
        console.log('Interesting applicants data fetched successfully:', applicants);
        res.status(200).json({ success: true, data: applicants });
      } catch (error) {
        console.error('Error fetching interesting applicants data:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        console.log('Creating a new interesting applicant with data:', req.body);
        const applicant = await InterestingApplicant.create(req.body);
        console.log('Interesting applicant created successfully:', applicant);
        res.status(201).json({ success: true, data: applicant });
      } catch (error) {
        console.error('Error creating interesting applicant:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
