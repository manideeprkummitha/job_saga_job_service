import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import JobApplication from '@/models/JobApplication';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { applicationId } = req.query;

  console.log(`Received ${method} request for applicationId: ${applicationId}`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching job application with ID:', applicationId);
        const application = await JobApplication.findById(applicationId);
        if (!application) {
          console.log('Job application not found');
          return res.status(404).json({ success: false });
        }
        console.log('Job application fetched successfully:', application);
        res.status(200).json({ success: true, data: application });
      } catch (error) {
        console.error('Error fetching job application:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        console.log('Updating job application with ID:', applicationId, 'with data:', req.body);
        const application = await JobApplication.findByIdAndUpdate(applicationId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!application) {
          console.log('Job application not found for update');
          return res.status(404).json({ success: false });
        }
        console.log('Job application updated successfully:', application);
        res.status(200).json({ success: true, data: application });
      } catch (error) {
        console.error('Error updating job application:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        console.log('Deleting job application with ID:', applicationId);
        const deletedApplication = await JobApplication.deleteOne({ _id: applicationId });
        if (deletedApplication.deletedCount === 0) {
          console.log('Job application not found for deletion');
          return res.status(404).json({ success: false });
        }
        console.log('Job application deleted successfully');
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting job application:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
