import { Request, Response } from "express";
import { ListNewsService } from "../services/ListNews";

export class ListNewsController {
    constructor(private service: ListNewsService){
        this.read = this.read.bind(this)
    }

    async read(request:Request, response:Response) {
        try {
            const page = request.query.page as string;
            const limit = request.query.limit as string;

            const news = await this.service.execute(page, limit);

            return response.status(200).json(news);
        } catch (error) {
            return response.status(400).json({Error:error})
        }
    }
}