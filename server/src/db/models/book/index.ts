import mongoose, {Document, Schema} from 'mongoose';
import {AuthorDocument} from "../author";

const uniqueValidator = require('mongoose-unique-validator');

export interface BookDocument extends Document {
  _id: string;
  title: string;
  author?: AuthorDocument;
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    {type: String}
  ],
});

BookModel.plugin(uniqueValidator);

export default mongoose.model<BookDocument>('Book', BookModel);
