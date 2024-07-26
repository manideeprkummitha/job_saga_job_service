import { NextApiRequest, NextApiResponse } from 'next';
import Job from '@/models/Job';
import connectDb from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  console.log(`Received ${method} request`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching jobs');
        const jobs = await Job.find({});
        console.log('Jobs fetched successfully');
        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        console.log('Creating a new job with data:', req.body);
        const job = await Job.create(req.body);
        console.log('Job created successfully:', job);
        res.status(201).json({ success: true, data: job });
      } catch (error) {
        console.error('Error creating job:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
