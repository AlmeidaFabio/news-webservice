import { INewsRepository } from "../repositories/INewsRepository";
import { INews } from "../types/INews";

export class EditNewsService {
    constructor(private newsRepository: INewsRepository) {}

    async execute(id:number, data: INews) {
        try {
            await this.newsRepository.update(id, data);
        } catch (error: any) {
            throw new Error(`Erro ao editar notícia: ${error.message}`);
        }
    }
}