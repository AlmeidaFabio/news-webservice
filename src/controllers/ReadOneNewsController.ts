import { Request, Response } from "express";
import { ReadOneNewsService } from "../services/ReadOneNews";

export class ReadOneNewsController {
    constructor(private service: ReadOneNewsService){
        this.readOneNews = this.readOneNews.bind(this)
    }

    async readOneNews(request:Request, response:Response) {
        const { id } = request.params

        try {
            const news = await this.service.execute(parseInt(id))

            if(news) {
                return response.status(200).json(news)
            } else {
                return response.status(400).json({Error: "Notícia não encontrada"})
            }
        } catch (error) {
            return response.status(400).json({Error:error})
        }
    }
}