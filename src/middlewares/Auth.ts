import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class Auth {
    async verifyToken(request: Request, response: Response, next: NextFunction) {
        try {
            const token = request.headers.authorization || '';
            const SECRET = process.env.SECRET_KEY || '';

            if (token === '') {
                throw new Error('Token not found');
            }
            if (SECRET === '') {
                throw new Error('Secret key not found');
            }

            await new Promise<void>((resolve, reject) => {
                jwt.verify(token, SECRET, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            
            next();
        } catch (error) {
            return response.status(401).json({error: error});
        }
    }
}
