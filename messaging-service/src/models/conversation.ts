import mongoose, { Schema, Document } from 'mongoose';
import { IUserManagement } from './User_management'; // Import the user model for reference

export interface IConversation extends Document {
  participants: IUserManagement['_id'][];
  messages: mongoose.Types.ObjectId[]; // Reference to messages
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema: Schema = new Schema(
  {
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User_management', required: true }],
      validate: {
        validator: function(participants: mongoose.Types.ObjectId[]) {
          // Ensure there are at least two participants
          return participants.length >= 2;
        },
        message: 'A conversation must have at least two participants.',
      },
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true,
  }
);

// Ensure uniqueness of participants in a conversation
ConversationSchema.pre('save', function(next) {
  if (this.participants.length !== new Set(this.participants).size) {
    return next(new Error('Participants must be unique.'));
  }
  next();
});

const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
