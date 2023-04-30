import { connection } from "../../database/connections/mysql";
import { IAuthor } from "../../types/IAuthor";
import { IAuthorRepository } from "../IAuthorRepository";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class AuthorsRepository implements IAuthorRepository {
    async create(data: IAuthor): Promise<IAuthor> {
        const query = "INSERT INTO authors (name, email, password) VALUES (?, ?, ?)";
        const values = [data.name, data.email, data.password];
        const result = await new Promise<any>((resolve, reject) => {
            connection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        const createdAuthor = { ...data, id: result.insertId };
        return createdAuthor;
    }
    
    async signin(email: string, password: string): Promise<string> {
        const SECRET = process.env.SECRET_KEY || ''

        const query = "SELECT password FROM authors WHERE email = ?";

        const values = [email];
        const result = await new Promise<any>((resolve, reject) => {
            connection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        if (result.length === 0) {
            throw new Error("E-mail ou senha inválidos.");
        }
        const hashedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) {
            throw new Error("E-mail ou senha inválidos.");
        }

        if (SECRET === '') {
            throw new Error('Secret key not found');
        }
        
        const token = jwt.sign({ id:result.id }, SECRET, {
            expiresIn:86400
        });

        return token
    }

    async findByEmail(email: string): Promise<IAuthor> {
        const query = "SELECT * FROM authors WHERE email = ?";
        const values = [email];
        const result = await new Promise<any>((resolve, reject) => {
            connection.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        if (result.length === 0) {
            throw new Error("Autor não encontrado.");
        }
        const author = result[0];
        return author;
        
    }
}