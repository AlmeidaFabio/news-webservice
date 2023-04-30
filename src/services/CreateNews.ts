import { INewsRepository } from "../repositories/INewsRepository";
import { INews } from "../types/INews";

export class CreateNewsService {
    constructor(private newsRepository: INewsRepository) {}

    async execute(data: INews) {
        try {
            const createdNews = await this.newsRepository.create(data);
            return createdNews;
        } catch (error: any) {
            throw new Error("Erro ao criar notícia: " + error.message);
        }
    }
}