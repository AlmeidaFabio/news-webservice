import { INewsRepository } from "../repositories/INewsRepository";

export class ReadOneNewsService {
    constructor(private newsRepository: INewsRepository) {}

    async execute(id:number) {
        try {
            const news = await this.newsRepository.readOne(id);
            return news;
        } catch (error: any) {
            throw new Error("Erro ao buscar notícia: " + error.message);
        }
    }
}