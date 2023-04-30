import { Request, Response } from "express";
import { DeleteNewsService } from "../services/DeleteNews";
import { ReadOneNewsService } from "../services/ReadOneNews";
import jwt from 'jsonwebtoken';

export class DeleteNewsController {
    constructor(private deleteService:DeleteNewsService, private readOneService:ReadOneNewsService) {
        this.deleteNews = this.deleteNews.bind(this)
    }

    async deleteNews(request:Request, response:Response) {
        const { id } = request.params
        const token = request.headers.authorization

        try {
            if(token) {
                const author = jwt.decode(token) as { id: number };
                const author_id = author.id;
                const news = await this.readOneService.execute(parseInt(id)) 

                if(news && news.author_id === author_id) {
                    await this.deleteService.execute(parseInt(id))

                    return response.status(200).json({Success: "Notícia deletada com sucesso!!"});
                } else {
                    return response.status(401).json({ Error: "Unauthorized" });
                }
            } else {
                return response.status(401).json({ Error: "Unauthorized" });
            }
        } catch (error) {
            return response.status(401).json({ Error:error });
        }
    }
}