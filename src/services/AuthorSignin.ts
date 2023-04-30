import { IAuthorRepository } from "../repositories/IAuthorRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export class AuthorSigninService {
    constructor(private authorsRepository: IAuthorRepository){}

    async execute(email:string, password:string) {
        const SECRET = process.env.SECRET_KEY || '';

        if (!email || !password) {
            throw createError(400, "Email e senha são obrigatórios.");
        }
            
        const author = await this.authorsRepository.findByEmail(email);
        
        if (!author) {
            throw createError(401, "Email ou senha inválidos.");
        }

        if(!await bcrypt.compare(password, author.password)) {
            throw createError(401, 'Email ou senha inválidos.')
        }

        if (SECRET === '') {
            throw new Error('Secret key not found');
        }

        try {
            const token = jwt.sign({ id:author.id }, SECRET, {
                expiresIn:86400
            });

            return token;
        } catch (error) {
            throw createError(500, 'Erro ao criar token.');
        }
    }
}