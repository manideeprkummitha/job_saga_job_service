import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import InterestingApplicant from '@/models/IntrestingApplicant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { applicantId } = req.query;

  console.log(`Received ${method} request for applicantId: ${applicantId}`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching interesting applicant data');
        const applicant = await InterestingApplicant.findById(applicantId);
        if (!applicant) {
          console.log('Applicant not found');
          return res.status(404).json({ success: false });
        }
        console.log('Applicant data fetched successfully:', applicant);
        res.status(200).json({ success: true, data: applicant });
      } catch (error) {
        console.error('Error fetching interesting applicant data:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        console.log('Updating interesting applicant with data:', req.body);
        const applicant = await InterestingApplicant.findByIdAndUpdate(applicantId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!applicant) {
          console.log('Applicant not found for update');
          return res.status(404).json({ success: false });
        }
        console.log('Applicant updated successfully:', applicant);
        res.status(200).json({ success: true, data: applicant });
      } catch (error) {
        console.error('Error updating interesting applicant:', error);
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        console.log('Deleting interesting applicant');
        const deletedApplicant = await InterestingApplicant.deleteOne({ _id: applicantId });
        if (deletedApplicant.deletedCount === 0) {
          console.log('Applicant not found for deletion');
          return res.status(404).json({ success: false });
        }
        console.log('Applicant deleted successfully');
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting interesting applicant:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
