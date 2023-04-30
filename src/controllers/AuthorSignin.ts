import { Request, Response } from "express";
import { AuthorSigninService } from "../services/AuthorSignin";

export class AuthorSigninController {
    constructor(private authorSigninService: AuthorSigninService) {
        this.signin = this.signin.bind(this)
    }

    async signin(request:Request, response:Response) {
        const { email, password } = request.body

        try {
            const loggedAuthorToken = await this.authorSigninService.execute(email, password)

            return response.status(200).json({token: loggedAuthorToken})
        } catch (error:any) {
            return response.status(400).json({Error: "Erro ao fazer o login: " + error})
        }
    }
}