import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/db';
import Message from '@/models/message';
import UserManagement from '@/models/User_management'; // Ensure this import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Incoming request: ${req.method}`);

  const { messageId } = req.query;
  console.log('Fetching message with id:', messageId);

  await connectDb();
  console.log('Database connection ensured');

  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching the message by ID');
        const message = await Message.findById(messageId).populate('sender', 'firstName lastName email').populate('receiver', 'firstName lastName email');
        console.log("The returned message based on the provided ID is:", message);
        if (!message) {
          console.log('Message not found');
          return res.status(404).json({ error: "Message not found" });
        }
        res.status(200).json(message);
      } catch (error: any) {
        console.error('Failed to fetch message:', error);
        res.status(500).json({ error: 'Failed to fetch message' });
      }
      break;

    case 'DELETE':
      try {
        console.log('Deleting the message by ID');
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
          console.log('Message not found');
          return res.status(404).json({ error: "Message not found" });
        }
        console.log('Message deleted successfully');
        res.status(204).json({ message: "Message deleted" });
      } catch (error: any) {
        console.error('Failed to delete message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
      }
      break;

    case 'PUT':
      try {
        console.log('Updating the message by ID');
        const { content, isRead } = req.body;
        console.log('Content:', content, 'IsRead:', isRead);
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          { content, isRead },
          { new: true }
        ).populate('sender', 'firstName lastName email').populate('receiver', 'firstName lastName email');
        if (!updatedMessage) {
          console.log('Message not found');
          return res.status(404).json({ error: "Message not found" });
        }
        console.log('Message updated successfully');
        res.status(200).json(updatedMessage);
      } catch (error: any) {
        console.error('Failed to update message:', error);
        res.status(500).json({ error: 'Failed to update message' });
      }
      break;

    default:
      console.log(`Method ${req.method} not allowed`);
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
