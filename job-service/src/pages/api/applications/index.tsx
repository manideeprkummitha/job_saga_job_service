import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import JobApplication from '@/models/JobApplication';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  console.log(`Received ${method} request`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching job applications');
        const applications = await JobApplication.find({});
        console.log('Job applications fetched successfully:', applications);
        res.status(200).json({ success: true, data: applications });
      } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        console.log('Creating a new job application with data:', req.body);
        const application = await JobApplication.create(req.body);
        console.log('Job application created successfully:', application);
        res.status(201).json({ success: true, data: application });
      } catch (error) {
        console.error('Error creating job application:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
