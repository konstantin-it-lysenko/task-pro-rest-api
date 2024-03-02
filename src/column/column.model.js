import { Schema, model } from 'mongoose';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for column'],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

export const Column = model('Column', columnSchema);