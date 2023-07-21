import mongoose, {Document, Schema} from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');
export interface AuthorDocument extends Document {
  _id: string;
  name: string;
  dateOfBirth?: number;
}

const Index = new Schema<AuthorDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  dateOfBirth: {
    type: Number,
  },
});

Index.plugin(uniqueValidator);

export default mongoose.model<AuthorDocument>('Author', Index);