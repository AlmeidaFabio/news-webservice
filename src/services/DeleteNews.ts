import { INewsRepository } from "../repositories/INewsRepository";

export class DeleteNewsService {
    constructor(private newsRepository: INewsRepository) {}

    async execute(id:number) {
        try {
            await this.newsRepository.delete(id);
        } catch (error: any) {
            throw new Error("Erro ao deletar notícia: " + error.message);
        }
    }
}