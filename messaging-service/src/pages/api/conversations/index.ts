import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import Conversation from '@/models/conversation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  console.log(`Request Method: ${method}`);

  await connectDb();
  console.log('Database connected');

  switch (method) {
    case 'GET':
      try {
        console.log('Handling GET request');
        const conversations = await Conversation.find({}).populate('participants messages');
        console.log('Fetched Conversations:', conversations);
        res.status(200).json({ success: true, data: conversations });
      } catch (error:any) {
        console.error('Error fetching conversations:', error);
        res.status(400).json({ success: false, message: 'Error fetching conversations', error: error.message });
      }
      break;
    case 'POST':
      try {
        console.log('Handling POST request');
        const conversation = await Conversation.create(req.body);
        console.log('Created Conversation:', conversation);
        res.status(201).json({ success: true, data: conversation });
    } catch (error:any) {
        console.error('Error creating conversation:', error);
        res.status(400).json({ success: false, message: 'Error creating conversation', error: error.message });
      }
      break;
    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
