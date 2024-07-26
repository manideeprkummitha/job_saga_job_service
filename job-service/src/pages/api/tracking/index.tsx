import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import JobTracking from '@/models/JobTracking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  console.log(`Received ${method} request`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching job tracking data');
        const trackings = await JobTracking.find({});
        console.log('Job tracking data fetched successfully:', trackings);
        res.status(200).json({ success: true, data: trackings });
      } catch (error) {
        console.error('Error fetching job tracking data:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        console.log('Creating a new job tracking entry with data:', req.body);
        const tracking = await JobTracking.create(req.body);
        console.log('Job tracking entry created successfully:', tracking);
        res.status(201).json({ success: true, data: tracking });
      } catch (error) {
        console.error('Error creating job tracking entry:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
