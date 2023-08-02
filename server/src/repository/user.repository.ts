import {UserModel, UserDocument} from "../db/models";
import {CreateUserInput, UpdateUserInput} from "dto";

export class UserRepository {
    async getUsers(): Promise<UserDocument[] | null> {
        return UserModel.find({});
    }

    async getUserByUsername(username: string): Promise<UserDocument | null> {
        return UserModel.findOne({username});
    }

    async getUserById(id: string): Promise<UserDocument | null> {
        return UserModel.findById(id).exec();
    }

    async createUser(input: CreateUserInput): Promise<UserDocument | null> {
        return new UserModel(input).save();
    }

    async updateUser(username: string, input: UpdateUserInput): Promise<UserDocument | null> {
        return UserModel.findOneAndUpdate({username: username}, input, {new: true});
    }

    async deleteUser(username: string): Promise<UserDocument | null> {
        return UserModel.findOneAndDelete({username});
    }
}
