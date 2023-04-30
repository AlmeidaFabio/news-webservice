import { connection } from "../../database/connections/mysql";
import { INews } from "../../types/INews";
import { INewsRepository } from "../INewsRepository";

export class NewsRepository implements INewsRepository {
    async create(data: INews): Promise<INews> {
        return new Promise<INews>((resolve, reject) => {
            connection.query(
                "INSERT INTO news (title, content, author_id) VALUES (?, ?, ?)",
                [data.title, data.content, data.author_id],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const news = {
                        id: results.insertId,
                        title: data.title,
                        content: data.content,
                        author_id: data.author_id,
                        created_at: new Date(),
                        updated_at: new Date()
                    } as INews;

                    resolve(news);
                }
            );
        });    
    }

    async read(page?: string, limit?: string): Promise<INews[]> {
        const pageSize = limit ? parseInt(limit, 10) : 10;
        const offset = page ? (parseInt(page, 10) - 1) * pageSize : 0;

        return new Promise<INews[]>((resolve, reject) => {
            connection.query(`SELECT * FROM news LIMIT ${pageSize} OFFSET ${offset}`, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                const news = results.map((result:INews ) => ({
                    id: result.id,
                    title: result.title,
                    content: result.content,
                    author: result.author_id,
                    created_at: result.created_at,
                    updated_at: result.updated_at,
                })) as INews[];
                resolve(news);
            });
        });
    }

    readOne(id: number): Promise<INews> {
        return new Promise<INews>((resolve, reject) => {
            connection.query("SELECT * FROM news WHERE id = ?", [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length === 0) {
                    reject("News not found");
                    return;
                }
                const result = results[0];
                const news = {
                    id: result.id,
                    title: result.title,
                    content: result.content,
                    author_id: result.author_id,
                    created_at: result.created_at,
                    updated_at: result.updated_at
                } as INews;
                resolve(news);
            });
        });
    }

    update(id: number, data: INews): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query(
                "UPDATE news SET title = ?, content = ?, author_id = ?, updated_at = ? WHERE id = ?",
                [data.title, data.content, data.author_id, new Date(), id],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (results.affectedRows === 0) {
                        reject(new Error(`News with id ${id} not found`));
                        return;
                    }

                    resolve();
                }
            );
        });
    }

    delete(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query("UPDATE news SET deleted_at = ? WHERE id = ?", [new Date(), id], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.affectedRows === 0) {
                    reject(new Error("Notícia não encontrada"));
                    return;
                }
                resolve();
            });
        });
    }
    
}