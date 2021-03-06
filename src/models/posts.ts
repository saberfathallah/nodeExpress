/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose, { Schema, Document } from 'mongoose';

interface PostSchema extends Document {
  comments: string[];
  description: string;
  userId: string;
  categoryId: string;
}

const postSchema = new Schema({
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, post): void => {
      post.id = post._id;
      delete post._id;
      delete post.__v;
    },
  },
});

postSchema.index({ description: 1 });

export default mongoose.model<PostSchema>('Post', postSchema);
