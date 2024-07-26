import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import Message from '@/models/message';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectDb();
  console.log('Database connected successfully');

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching all messages...');
        const messages = await Message.find({}).populate('sender').populate('conversationId');
        console.log('Messages fetched successfully');
        res.status(200).json({ success: true, data: messages });
      } catch (error:any) {
        console.error('Error fetching messages:', error);
        res.status(400).json({ success: false, message: 'Error fetching messages', error: error.message });
      }
      break;
    case 'POST':
      try {
        console.log('Creating a new message...');
        const message = await Message.create(req.body);
        console.log('Message created successfully:', message);
        res.status(201).json({ success: true, data: message });
      } catch (error:any) {
        console.error('Error creating message:', error);
        res.status(400).json({ success: false, message: 'Error creating message', error: error.message });
      }
      break;
    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
