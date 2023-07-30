import mongoose, {Document, Schema} from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

export interface UserDocument extends Document {
    _id: string;
    username: string;
    password: string;
    favoriteGenre: string;
}

const UserModel = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    favoriteGenre: {
        type: String,
    }
});

UserModel.plugin(uniqueValidator);

export default mongoose.model<UserDocument>('User', UserModel);
