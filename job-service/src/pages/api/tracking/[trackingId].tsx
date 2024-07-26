import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import JobTracking from '@/models/JobTracking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { trackingId } = req.query;

  console.log(`Received ${method} request for trackingId: ${trackingId}`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching job tracking data with ID:', trackingId);
        const tracking = await JobTracking.findById(trackingId);
        if (!tracking) {
          console.log('Job tracking data not found');
          return res.status(404).json({ success: false });
        }
        console.log('Job tracking data fetched successfully:', tracking);
        res.status(200).json({ success: true, data: tracking });
      } catch (error) {
        console.error('Error fetching job tracking data:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        console.log('Updating job tracking data with ID:', trackingId, 'with data:', req.body);
        const tracking = await JobTracking.findByIdAndUpdate(trackingId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!tracking) {
          console.log('Job tracking data not found for update');
          return res.status(404).json({ success: false });
        }
        console.log('Job tracking data updated successfully:', tracking);
        res.status(200).json({ success: true, data: tracking });
      } catch (error) {
        console.error('Error updating job tracking data:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        console.log('Deleting job tracking data with ID:', trackingId);
        const deletedTracking = await JobTracking.deleteOne({ _id: trackingId });
        if (deletedTracking.deletedCount === 0) {
          console.log('Job tracking data not found for deletion');
          return res.status(404).json({ success: false });
        }
        console.log('Job tracking data deleted successfully');
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting job tracking data:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
