import mongoose, { Schema, Document } from 'mongoose';
import { IUserManagement } from './User_management';
import { IConversation } from './conversation';

export interface IMessage extends Document {
  sender: IUserManagement['_id'];
  receiver: IUserManagement['_id']; // Add receiver field
  content: string;
  timestamp: Date;
  conversationId: IConversation['_id'];
  isRead: boolean;
}

const MessageSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User_management', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User_management', required: true }, // Add receiver field
    content: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    isRead: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
