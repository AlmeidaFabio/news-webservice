import { Request, Response } from "express";
import { EditNewsService } from "../services/EditNews";
import jwt from 'jsonwebtoken';
import { INews } from "../types/INews";
import { ReadOneNewsService } from "../services/ReadOneNews";

export class EditNewsController {
    constructor(private editService: EditNewsService, private readOneService: ReadOneNewsService){
        this.editNews = this.editNews.bind(this)
    }

    async editNews(request:Request, response:Response) {
        const { title, content } = request.body
        const { id } = request.params
        const token = request.headers.authorization

        try {            
            if (token) {
                const author = jwt.decode(token) as { id: number };
                const author_id = author.id;
                const news = await this.readOneService.execute(parseInt(id))
                
                //Verificando se s notícia existe e se o author logado é o author da notícia
                if(news && news.author_id === author_id) {
                    const data: INews = { title, content, author_id };

                    await this.editService.execute(parseInt(id), data);

                    return response.status(200).json({Success: "Notícia atualizada com sucesso!!"});
                } else {
                    return response.status(401).json({ error: "Unauthorized" });
                }
                
            } else {
                return response.status(401).json({ error: "Unauthorized" });
            }
        } catch (error) {
            return response.status(400).json({ Error: error });
        }
  
    }
}