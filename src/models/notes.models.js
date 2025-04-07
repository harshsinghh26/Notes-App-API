import mongoose, { Schema } from 'mongoose';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    tag: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Notes = mongoose.model('Notes', notesSchema);
