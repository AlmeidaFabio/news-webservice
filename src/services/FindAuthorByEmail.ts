import { IAuthorRepository } from "../repositories/IAuthorRepository";

export class FindAuthorByEmailService {
    constructor(private authorsRepository: IAuthorRepository) {}

    async execute(email:string) {
        try {
            const author = await this.authorsRepository.findByEmail(email)
            return author
        } catch (error) {
            throw new Error("Autor não encontrado: " + error);
            
        }
    }
}