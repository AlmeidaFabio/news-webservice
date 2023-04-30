import { Request, Response } from "express";
import { FindAuthorByEmailService } from "../services/FindAuthorByEmail";

export class FindAuthorByEmailController {
    constructor(private findAuthorService: FindAuthorByEmailService){
        this.findAuthorByEmail = this.findAuthorByEmail.bind(this)
    }

    async findAuthorByEmail(request:Request, response:Response) {
        const { email } = request.body

        try {
            const author = await this.findAuthorService.execute(email)
            return author
        } catch (error) {
            return response.status(400).json({Error:error})
        }
    }
}