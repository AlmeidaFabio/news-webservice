import { IAuthorRepository } from "../repositories/IAuthorRepository";
import { IAuthor } from "../types/IAuthor";

export class AuthorSignupService {
    constructor(private authorsRepository: IAuthorRepository) {}

    async execute(data: IAuthor) {
        try {
            const createdAuthor = await this.authorsRepository.create(data);
            return createdAuthor;
        } catch (error: any) {
            throw new Error("Erro ao cadastrar autor: " + error.message);
        }
    }
}