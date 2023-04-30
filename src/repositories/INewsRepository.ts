import { INews } from "../types/INews";

export interface INewsRepository {
    create(data: INews): Promise<INews>;
    read(page?:string, limit?:string):Promise<INews[]>;
    readOne(id:number): Promise<INews>;
    update(id:number, data:INews): Promise<void>;
    delete(id:number): Promise<void>;
}