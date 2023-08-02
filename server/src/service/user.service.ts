import config from "../config";
import bcrypt from "bcryptjs";

import {UserRepository} from "../repository";
import {UserDocument} from "../db/models";
import {CreateUserInput, UpdateUserInput} from "dto";

export class UserService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUsers(): Promise<UserDocument[] | null> {
        return this.userRepository.getUsers();
    }

    async getUserByUsername(username: string): Promise<UserDocument | null> {
        return this.userRepository.getUserByUsername(username);
    }

    async createUser(userInput: CreateUserInput): Promise<UserDocument | null> {
        const hashedPassword = await this.hashPassword(userInput.password);

        const newUser = {
            ...userInput,
            password: hashedPassword
        };

        return this.userRepository.createUser(newUser);
    }


    async updateUser(username: string, userInput: UpdateUserInput): Promise<UserDocument | null> {
        if (userInput.password) {
            userInput.password = await this.hashPassword(userInput.password);
        }

        return this.userRepository.updateUser(username, userInput);
    }

    async deleteUser(username: string): Promise<UserDocument | null> {
        return this.userRepository.deleteUser(username);
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, Number(config.SALT_ROUNDS)!);
    }

    async comparePasswords(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
