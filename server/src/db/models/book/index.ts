import mongoose, {Document, Schema} from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

export interface BookDocument extends Document {
  _id: string;
  title: string;
  author?: string;
  genres?: string[];
  published?: number;
}

const BookModel = new Schema<BookDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: String,
  },
  genres: [
    {type: String}
  ],
});

BookModel.plugin(uniqueValidator);

export default mongoose.model<BookDocument>('Book', BookModel);
