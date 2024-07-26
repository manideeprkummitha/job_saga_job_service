import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import Conversation from '@/models/conversation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { conversationId, userId } = req.query;

  console.log(`Request Method: ${method}`);
  console.log(`Conversation ID: ${conversationId}`);
  console.log(`User ID: ${userId}`);

  await connectDb();
  console.log('Database connected successfully');

  switch (method) {
    case 'GET':
      try {
        console.log('Handling GET request');
        const conversation = await Conversation.findOne({
          _id: conversationId,
          participants: userId,
        }).populate('participants messages');
        if (!conversation) {
          console.log('Conversation not found');
          return res.status(404).json({ success: false, message: 'Conversation not found' });
        }
        console.log('Fetched Conversation:', conversation);
        res.status(200).json({ success: true, data: conversation });
      } catch (error:any) {
        console.error('Error fetching conversation:', error);
        res.status(400).json({ success: false, message: 'Error fetching conversation', error: error.message });
      }
      break;

    case 'PUT':
      try {
        console.log('Handling PUT request');
        const conversation = await Conversation.findOneAndUpdate(
          {
            _id: conversationId,
            participants: userId,
          },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        ).populate('participants messages');
        if (!conversation) {
          console.log('Conversation not found for update');
          return res.status(404).json({ success: false, message: 'Conversation not found for update' });
        }
        console.log('Updated Conversation:', conversation);
        res.status(200).json({ success: true, data: conversation });
      } catch (error:any) {
        console.error('Error updating conversation:', error);
        res.status(400).json({ success: false, message: 'Error updating conversation', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        console.log('Handling DELETE request');
        const deletedConversation = await Conversation.findOneAndDelete({
          _id: conversationId,
          participants: userId,
        });
        if (!deletedConversation) {
          console.log('Conversation not found for deletion');
          return res.status(404).json({ success: false, message: 'Conversation not found for deletion' });
        }
        console.log('Deleted Conversation:', deletedConversation);
        res.status(200).json({ success: true, data: {} });
      } catch (error:any) {
        console.error('Error deleting conversation:', error);
        res.status(400).json({ success: false, message: 'Error deleting conversation', error: error.message });
      }
      break;

    default:
      console.log(`Method ${method} not allowed`);
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
