import { Request, Response } from "express";
import { CreateNewsService } from "../services/CreateNews";
import { INews } from "../types/INews";
import jwt from 'jsonwebtoken';

export class CreateNewsController {
    constructor(private service: CreateNewsService) {
        this.create = this.create.bind(this)
    }

    async create(request:Request, response:Response) {
        const { title, content } = request.body
        const token = request.headers.authorization

        try {
            if (token) {
                const author = jwt.decode(token) as { id: number };
                const author_id = author.id;
                const data: INews = { title, content, author_id };
                const news = await this.service.execute(data);
                return response.status(201).json(news);
            } else {
                return response.status(401).json({ error: "Unauthorized" });
            }
        } catch (error) {
            return response.status(400).json({ error: error });
        }
    }
}