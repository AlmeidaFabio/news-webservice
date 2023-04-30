import { INewsRepository } from "../repositories/INewsRepository";

export class ListNewsService {
    constructor(private newsRepository: INewsRepository) {}

    async execute(page?:string, limit?:string) {
        try {
            const news = await this.newsRepository.read();

            let result = news

            if(page && limit) {
                const startIndex = (parseInt(page) - 1) * parseInt(limit)
                const endIndex = parseInt(page) * parseInt(limit)
                result = news.slice(startIndex, endIndex)
            }
            return news;
        } catch (error: any) {
            throw new Error("Erro ao listar notícias: " + error.message);
        }
    }
}