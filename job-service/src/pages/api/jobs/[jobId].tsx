import { NextApiRequest, NextApiResponse } from 'next';
import Job from '@/models/Job';
import connectDb from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { jobId } = req.query;

  console.log(`Received ${method} request for jobId: ${jobId}`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching job with ID:', jobId);
        const job = await Job.findById(jobId);
        if (!job) {
          console.log('Job not found');
          return res.status(404).json({ success: false, message: 'Job not found' });
        }
        console.log('Job fetched successfully:', job);
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching job', error: error.message });
      }
      break;

    case 'PUT':
      try {
        console.log('Updating job with ID:', jobId, 'with data:', req.body);
        const job = await Job.findByIdAndUpdate(jobId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!job) {
          console.log('Job not found for update');
          return res.status(404).json({ success: false, message: 'Job not found for update' });
        }
        console.log('Job updated successfully:', job);
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ success: false, message: 'Server error while updating job', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        console.log('Deleting job with ID:', jobId);
        const deletedJob = await Job.deleteOne({ _id: jobId });
        if (deletedJob.deletedCount === 0) {
          console.log('Job not found for deletion');
          return res.status(404).json({ success: false, message: 'Job not found for deletion' });
        }
        console.log('Job deleted successfully');
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting job', error: error.message });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
