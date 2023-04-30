import { Request, Response } from "express";
import { AuthorSignupService } from "../services/AuthorSignup";
import bcrypt from 'bcrypt';

export class AuthorSignupController {
    constructor(private authorSignupService: AuthorSignupService) {
        this.signup = this.signup.bind(this)
    }

    async signup(request:Request, response:Response) {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({ Error: "Todos os campos são obrigatórios." });
        }
        
        try {
            const hash = await bcrypt.hash(password.toString(), 10)
            const data = {
                name,
                email,
                password: hash
            }

            const createdAuthor = await this.authorSignupService.execute(data)
            return response.status(201).json(createdAuthor)
        } catch (error:any) {
            return response.status(400).json({Error: error.message})           
        }
    }
}