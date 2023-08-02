import jwt from 'jsonwebtoken';
import config from "../config";

import {NextFunction} from "express";
import {UserRepository} from "repository";

const authenticateToken = (userRepository: UserRepository) =>
    async (req: any, res: unknown, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return next();

        try {
            const decodedToken = jwt.verify(token, config.JWT_SECRET!) as { id: string; };
            req.user = await userRepository.getUserById(decodedToken.id);

            next();
        } catch (err: any) {
            err.message = 'Authentication failed due to invalid token.';

            return next();
        }
    }


export default authenticateToken;
