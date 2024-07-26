import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDb from '@/lib/db';
import Conversation from '@/models/conversation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { conversationId } = req.query;

  console.log(`Request Method: ${method}`);
  console.log(`Conversation ID: ${conversationId}`);

  if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId as string)) {
    return res.status(400).json({ success: false, message: 'Invalid Conversation ID' });
  }

  await connectDb();
  console.log('Database connected successfully');

  switch (method) {
    case 'GET':
      try {
        console.log('Handling GET request');
        const conversation = await Conversation.findById(conversationId).populate('participants messages');
        if (!conversation) {
          console.log('Conversation not found');
          return res.status(404).json({ success: false, message: 'Conversation not found' });
        }
        console.log('Fetched Conversation:', conversation);
        res.status(200).json({ success: true, data: conversation });
      } catch (error: any) {
        console.error('Error fetching conversation:', error);
        res.status(400).json({ success: false, message: 'Error fetching conversation', error: error.message });
      }
      break;

    case 'PUT':
      try {
        console.log('Handling PUT request');
        const updatedConversation = await Conversation.findByIdAndUpdate(conversationId, req.body, {
          new: true,
          runValidators: true,
        }).populate('participants messages');
        if (!updatedConversation) {
          console.log('Conversation not found for update');
          return res.status(404).json({ success: false, message: 'Conversation not found for update' });
        }
        console.log('Updated Conversation:', updatedConversation);
        res.status(200).json({ success: true, data: updatedConversation });
      } catch (error: any) {
        console.error('Error updating conversation:', error);
        res.status(400).json({ success: false, message: 'Error updating conversation', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        console.log('Handling DELETE request');
        const deletedConversation = await Conversation.deleteOne({ _id: conversationId });
        if (deletedConversation.deletedCount === 0) {
          console.log('Conversation not found for deletion');
          return res.status(404).json({ success: false, message: 'Conversation not found for deletion' });
        }
        console.log('Deleted Conversation');
        res.status(200).json({ success: true, data: {} });
      } catch (error: any) {
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
